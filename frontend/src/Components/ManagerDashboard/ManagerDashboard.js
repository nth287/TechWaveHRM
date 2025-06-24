import React, { useState, useEffect } from 'react';
import axios from "axios";
import './ManagerDashboard.css';
import ModernNav from "../Nav/ModernNav";

const URL = "http://localhost:5000/users";

// Function to fetch users data
const fetchHandler = async () => {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { users: [] };
    }
};

// Function to download CSV report
const downloadReport = (data) => {
    const header = ['Employee ID', 'Employee Name', 'Department', 'Leave Type', 'Reason', 'Start Date', 'End Date', 'Status'];
    const rows = data.map(user => [
        user.empID,
        user.empName,
        user.depName,
        user.leaveType,
        user.reason,
        formatDate(user.startDate),
        formatDate(user.endDate),
        user.status
    ]);

    let csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\n";
    rows.forEach(row => {
        csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leave_requests_report.csv");
    document.body.appendChild(link); // Append the link to the DOM
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the link after the download
};

// Helper to format date as yyyy-mm-dd
const formatDate = (date) => {
    if (!date) return '';
    return date.toString().split('T')[0];
};

function ManagerDashboard() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchHandler().then((data) => {
            setUsers(data.users || []);
            setFilteredUsers(data.users || []);
        });
    }, []);

    // Handle the approval of leave requests
    const handleApproval = async (id, status) => {
        try {
            const response = await axios.put(`http://localhost:5000/users/approve/${id}`, {
                status: status,
                action: status === "Approved" ? "Leave granted" : "Leave rejected"
            });
            
            if (response.status === 200) {
                alert(`Leave request ${status.toLowerCase()} successfully!`);
                // Refresh the data
                const updatedData = await fetchHandler();
                setUsers(updatedData.users || []);
                setFilteredUsers(updatedData.users || []);
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert(error.response?.data?.message || "Failed to update leave request. Please try again.");
        }
    };

    // Handle the search input change
const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter users based on the query (matching employee name or ID)
    const filtered = users.filter(user => 
        String(user.empID).toLowerCase().includes(query.toLowerCase()) ||  // Convert empID to string
        user.empName.toLowerCase().includes(query.toLowerCase()) // empName should be a string
    );
    setFilteredUsers(filtered);
};


    return (
        <div className='manager' >
            <br/>
            <br/>
            <h1>Leave Requests</h1>
            <div className="manager-container">

            {/* Search bar */}
            <div className="search-row">
            <div className="search-bar">
            <span className="search-icon">&#128269;</span>
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                    placeholder="Search by Employee ID or Name" 
                />
            </div>

            {/* Report Generation Button */}
            <div className="download-report-container">
                <button className="download-report" onClick={() => downloadReport(filteredUsers)}>
                    Download Leave Report
                </button>
            </div>
            </div>

            {/* Leave Requests Table */}
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Department</th>
                        <th>Leave Type</th>
                        <th>Reason</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user.empID}</td>
                                <td>{user.empName}</td>
                                <td>{user.depName}</td>
                                <td>{user.leaveType}</td>
                                <td>{user.reason}</td>
                                <td>{formatDate(user.startDate)}</td>
                                <td>{formatDate(user.endDate)}</td>
                                <td>{user.status}</td>
                                
                                <td>
                                    {user.status === "Pending" && (
                                        <>
                                            <button className="button-approve" onClick={() => handleApproval(user._id, "Approved")}>Approve</button>
                                            <button className="button-reject" onClick={() => handleApproval(user._id, "Rejected")}>Reject</button>
                                        </>
                                    )}
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
        
        </div>
    );
}

export default ManagerDashboard;
