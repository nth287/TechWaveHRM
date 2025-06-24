import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import './Details.css';

const DEFAULT_EMP_ID = 1; // Change this to the desired empID

function Details() {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all leave requests for empID
    const fetchRequests = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/dashboard/${DEFAULT_EMP_ID}`);
            setLeaveRequests(res.data.leaveRequests || []);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch leave requests.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Delete a leave request
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this leave request?")) return;
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            fetchRequests(); // Refresh after delete
        } catch (err) {
            alert("Failed to delete leave request.");
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        return date.toString().split('T')[0];
    };

    if (loading) return <div className='details-container'><h1>Loading...</h1></div>;
    if (error) return <div className='details-container'><h1>{error}</h1></div>;

    return (
        <div className='details-container'>
            <h1 className="details-title">Leave Requests</h1>
            <br/>
            <br/>
            <table className="leave-table">
                <thead>
                    <tr>
                        <th>Leave ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Leave Type</th>
                        <th>Reason</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.length > 0 ? (
                        leaveRequests.map((req) => (
                            <tr key={req._id}>
                                <td>{req._id}</td>
                                <td>{req.empName}</td>
                                <td>{req.depName}</td>
                                <td>{req.leaveType}</td>
                                <td>{req.reason}</td>
                                <td>{formatDate(req.startDate)}</td>
                                <td>{formatDate(req.endDate)}</td>
                                <td>{req.status}</td>
                                <td>
                                  <div className="action-buttons">
                                  <Link to={`/details/${req._id}`} className="btn update-btn">Update</Link>
                                  <button className="btn delete-btn" onClick={() => handleDelete(req._id)}>Delete</button>
                                  </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">No leave requests found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Details;
