const express = require("express");
const router = express.Router();

// Import Models
const User = require("../Model/UserModel"); // Ensure this model exists


// Import Controllers
const UserControllers = require("../Controllers/UserControllers");

router.get("/", UserControllers.getAllUsers);
router.post("/", UserControllers.addUsers);
router.get("/dashboard/:empID", UserControllers.getEmployeeDashboard);
router.get("/:id", UserControllers.getById);
router.put("/:id", UserControllers.updateUser);
router.delete("/:id", UserControllers.deleteUser);
router.put("/approve/:id", UserControllers.updateApprovalStatus);
router.put("/update-approval/:id", UserControllers.updateApprovalStatus);
router.get("/empid/:empID", UserControllers.getByEmpID);


// Manager approves leave request & updates leave balance
router.put("/approve-leave/:requestID", async (req, res) => {
    try {
        const { requestID } = req.params;

        // Find the leave request
        const leaveRequest = await LeaveRequest.findById(requestID);
        if (!leaveRequest) return res.status(404).json({ message: "Leave request not found" });

        // Check if leave is already approved
        if (leaveRequest.status === "Approved") {
            return res.status(400).json({ message: "Leave already approved" });
        }

        // Update leave request status to "Approved"
        leaveRequest.status = "Approved";
        await leaveRequest.save();

        // Update the employee's leave balance
        const employee = await Employee.findOne({ employee_id: leaveRequest.employee_id });
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        employee.leaveBalance -= leaveRequest.days; // Reduce leave balance
        await employee.save();

        res.status(200).json({ message: "Leave approved successfully", updatedBalance: employee.leaveBalance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Export
module.exports = router;
