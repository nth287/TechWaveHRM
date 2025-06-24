const User = require("../Model/UserModel");

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error", error: err });
    }

    if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
};

const addUsers = async (req, res, next) => {
    const { empID, empName, depName, leaveType, reason, startDate, endDate } = req.body;

    if (!empID || !empName || !depName || !leaveType || !reason || !startDate || !endDate) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const today = new Date();
    today.setHours(0,0,0,0); // Set to midnight for date-only comparison

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
    }

    if (startDateObj > endDateObj) {
        return res.status(400).json({ message: "Start date cannot be after end date" });
    }

    if (startDateObj < today || endDateObj < today) {
        return res.status(400).json({ message: "Start date and end date cannot be before today" });
    }

    let user;
    try {
        user = new User({
            empID,
            empName,
            depName,
            leaveType,
            reason,
            startDate: startDateObj,
            endDate: endDateObj,
            status: "Pending",
            action: "Waiting for approval"
        });
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error", error: err });
    }

    return res.status(200).json({ user });
};

const getById = async (req, res, next) => {
    const id = req.params.id;
    let user;

    try {
        user = await User.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error", error: err });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.status !== "Pending") {
            return res.status(403).json({ message: "Cannot update approved or rejected leave requests" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.status !== "Pending") {
            return res.status(403).json({ message: "Cannot delete approved or rejected leave requests" });
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: "Leave request deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error", error: err });
    }
};

const updateApprovalStatus = async (req, res) => {
    const { id } = req.params;
    const { status, action } = req.body;

    try {
        const leaveRequest = await User.findById(id);
        if (!leaveRequest) {
            console.error(`Leave request not found for id: ${id}`);
            return res.status(404).json({ message: "Leave request not found" });
        }

        // If status is approved, update the employee's leave balance
        if (status === "Approved") {
            const startDate = new Date(leaveRequest.startDate);
            const endDate = new Date(leaveRequest.endDate);
            const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            
            // Update the employee's leave balance using $inc to avoid validation errors
            const updateResult = await User.updateOne(
                { empID: leaveRequest.empID },
                { $inc: { leaveBalance: -daysDiff } }
            );
            if (updateResult.matchedCount === 0) {
                console.error(`Employee not found for empID: ${leaveRequest.empID}`);
                return res.status(404).json({ message: "Employee not found" });
            }
        }

        // Update the leave request status and action
        leaveRequest.status = status;
        leaveRequest.action = action;
        await leaveRequest.save();

        res.status(200).json(leaveRequest);
    } catch (err) {
        console.error("Error updating approval status:", err);
        res.status(500).json({ message: "Server error", error: err.message, stack: err.stack });
    }
};

const updateLeaveBalance = async (empID, startDate, endDate) => {
    const leaveDays = (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24); // Calculate the number of leave days
    const employee = await User.findOne({ empID });

    if (!employee) {
        throw new Error("Employee not found");
    }

    employee.leaveBalance -= leaveDays; // Deduct leave days from the balance
    await employee.save();
};

const getEmployeeDashboard = async (req, res) => {
    const { empID } = req.params;
    console.log("Looking for empID:", empID);

    try {
        const employee = await User.findOne({ empID });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const leaveRequests = await User.find({ empID }); // Get leave requests for the employee

        let initialBalance = 20;
        let leaveBalance = initialBalance;

        leaveRequests.forEach(req => {
            if (req.status === "Approved") {
                const start = new Date(req.startDate);
                const end = new Date(req.endDate);
                const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
                leaveBalance -= days;
            }
        });

        return res.status(200).json({
            leaveBalance: leaveBalance,
            leaveRequests: leaveRequests,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

const getByEmpID = async (req, res) => {
    const empID = req.params.empID;
    try {
        const user = await User.findOne({ empID: Number(empID) });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ message: "Server error", error: err });
    }
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.updateApprovalStatus = updateApprovalStatus;
exports.updateLeaveBalance = updateLeaveBalance;
exports.getEmployeeDashboard = getEmployeeDashboard;
exports.getByEmpID = getByEmpID;
