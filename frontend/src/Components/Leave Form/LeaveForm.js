import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./Leave Form.css";

function LeaveForm({ users = [], refreshData }) {  // Added refreshData prop

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      // Assuming the API is set to DELETE the user by _id
      await axios.delete(`http://localhost:5000/users/${id}`);
      alert("User deleted successfully!");
      refreshData();  // Refresh the list of users after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const handlePrint = () => {
    window.print();  // This will trigger the print dialog
  };

  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    return (
      user.empID &&
      user.empID.toString().toLowerCase().includes(searchQuery.toLowerCase()) // Convert empID to string first
    );
  });

  // Helper to format date as yyyy-mm-dd
  const formatDate = (date) => {
    if (!date) return '';
    return date.toString().split('T')[0];
  };

  return (
    
    <div className="leave-form-container">

      {/* Search Bar */}
      <div className="details-search-container">
        <input
          type="text"
          placeholder="Search by Employee ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  // Update search query state
          className="details-search-input"
        />
        <button onClick={handlePrint}>Download Report</button>
      </div>

      <table className="leave-table">
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id || "N/A"}</td>
                <td>{user.empID || "N/A"}</td>
                <td>{user.empName || "N/A"}</td>
                <td>{user.depName || "N/A"}</td>
                <td>{user.leaveType || "N/A"}</td>
                <td>{formatDate(user.startDate) || "N/A"}</td>
                <td>{formatDate(user.endDate) || "N/A"}</td>
                <td>{user.reason || "N/A"}</td>
                <td>
                
                  <div className="btn-container">
                    <Link to={`/details/${user._id}`} className="btn update-btn">Update</Link>
                    <button className="btn delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
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

export default LeaveForm;
