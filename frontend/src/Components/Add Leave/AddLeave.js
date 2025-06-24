import React, { useState } from 'react';
import "./AddLeave.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Nav from "../Nav/Nav";

const URL = "http://localhost:5000/users";

function AddLeave() {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        empID: "",
        empName: "",
        depName: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
    });

    const [error, setError] = useState(""); // State for error messages
    const [successMessage, setSuccessMessage] = useState(""); // State for success message

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate dates
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        if (isNaN(startDate) || isNaN(endDate)) {
            alert("Please enter valid start and end dates.");
            return;
        }

        if (startDate > endDate) {
            alert("Start date cannot be later than end date.");
            return;
        }

        setError(""); // Clear error if validation passes

        sendRequest();
    };

    const sendRequest = async () => {
        try {
            await axios.post(URL, {
                empID: Number(formData.empID),
                empName: formData.empName,
                depName: formData.depName,
                leaveType: formData.leaveType,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
                reason: formData.reason,
            });

            alert("Leave Request Submitted Successfully!");
            setTimeout(() => {
                history('/details');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            const backendMessage = error.response?.data?.message;
            if (backendMessage) {
                alert(backendMessage);
                setError(backendMessage);
            } else {
                alert("Failed to submit leave request. Please try again later.");
                setError("Failed to submit leave request. Please try again later.");
            }
        }
    };

    return (
        <div className="container">
            <h2 className="heading">Leave Request Form</h2>

            {/* Render Success Message */}
            {successMessage && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}

            <form onSubmit={handleSubmit} className="form">
                <label className="label">Employee ID:</label>
                <input
                    type="text"
                    name="empID"
                    value={formData.empID}
                    onChange={handleChange}
                    required
                    className="input"
                /><br/>

                <label className="label">Employee Name:</label>
                <input
                    type="text"
                    name="empName"
                    value={formData.empName}
                    onChange={handleChange}
                    required
                    className="input"
                /><br/>

                <label className="label">Department :</label>
                <select
                    name="depName"
                    value={formData.depName}
                    onChange={handleChange}
                    required
                    className="input"
                >
                    <option value="">Select Department</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                </select><br/>

                <label className="label">Leave Type:</label>
                <select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleChange}
                    required
                    className="input"
                >
                    <option value="">Select Leave Type</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Vacation Leave">Vacation Leave</option>
                    <option value="Maternity Leave">Maternity Leave</option>
                    <option value="Other">Other</option>
                </select><br/>

                <label className="label">Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="input"
                /><br/>

                <label className="label">End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="input"
                /><br/>

                <label className="label">Reason for Leave:</label>
                <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="textarea"
                ></textarea><br/>

                <button type="submit" className="submitBtn">Submit</button><br/>
                <button
                    type="reset"
                    onClick={() =>
                        setFormData({
                            empID: "",
                            empName: "",
                            depName: "",
                            leaveType: "",
                            startDate: "",
                            endDate: "",
                            reason: "",
                        })
                    }
                    className="resetBtn"
                >
                    Reset
                </button><br/>
            </form>
        
        </div>
        
    );
}

export default AddLeave;
