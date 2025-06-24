import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './EmployeeDashboard.css';

const DEFAULT_EMP_ID = 1; // Set this to a real employee ID from your database

const EmployeeDashboard = () => {
    const navigate = useNavigate();
    // const { empID } = useParams();  // Removed useParams
    const empID = DEFAULT_EMP_ID;
    const [leaveBalance, setLeaveBalance] = useState(0);
    const [leaveRequests, setLeaveRequests] = useState([]);

    // Function to fetch updated leave balance and requests
    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/users/dashboard/${empID}`);
            console.log("Backend data:", res.data); // Debugging: Check if data is received correctly
            if (res.data) {
                setLeaveBalance(res.data.leaveBalance ?? 0);
                setLeaveRequests(res.data.leaveRequests ?? []);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [empID]);

    const formatDate = (date) => {
        if (!date) return '';
        return date.toString().split('T')[0];
    };

    // Use the latest leave balance from the most recent leave request if available
    const latestBalance = leaveBalance;

    return (
        <div className="edashboard">
            <div className="dashboard-main">
                <div className="dashboard-table-section">
                    <br/>
                    <br/>
                    <br/>
                    <h2>Leave Requests</h2>
                    <br/>
                    {leaveRequests.length === 0 ? (
                        <div>No leave requests yet</div>
                    ) : (
                        <table className="leave-requests-table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Reason</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaveRequests.map(req => (
                                    <tr key={req._id}>
                                        <td>{req.leaveType}</td>
                                        <td>{req.status}</td>
                                        <td>{formatDate(req.startDate)}</td>
                                        <td>{formatDate(req.endDate)}</td>
                                        <td>{req.reason}</td>
                                        <td>{req.depName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="right-section">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="dashboard-balance-card">
                        <div className="dashboard-balance-label">Leave Balance</div>
                        <div className="dashboard-balance-value">{latestBalance}</div>
                    </div>
                    <br/>
                    <br/>
                    <button className="add-leave-btn" onClick={() => navigate('/addleave')}>
                        <span className="plus-icon">&#43;</span> Add Leave
                    </button>
                </div>
            </div>
        </div>
        
    );
};

export default EmployeeDashboard;
