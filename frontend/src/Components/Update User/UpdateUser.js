import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function UpdateUser() {

    const [formData, setFormData] = useState({
        empID: "",
        empName: "",
        depName: "",
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/users/${id}`);
                console.log("API Response:", res.data);
    
                if (res.data && res.data.user) {
                    const userData = res.data.user;
    
                    // Convert ISO date to "yyyy-MM-dd"
                    const formatDate = (isoDate) => isoDate ? isoDate.split("T")[0] : "";
    
                    setFormData({
                        ...userData,
                        startDate: formatDate(userData.startDate),
                        endDate: formatDate(userData.endDate),
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id) fetchHandler();
    }, [id]);
    
    
    
    const sendRequest = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/users/${id}`, formData);
            console.log("Update successful", response.data);
            return response.data;
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };
    


    const handleChange = (e) => {
        let { name, value } = e.target;
        // Ensure only date part is stored for startDate and endDate
        if (name === "startDate" || name === "endDate") {
            value = value.split("T")[0];
        }
        setFormData({ ...formData, [name]: value });
    };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form:", formData);
        
        const result = await sendRequest();
        if (result) {
            alert("Update successful!");
            navigate("/Details");  // Navigate after successful update
        } else {
            alert("Failed to update details");
            // Do not redirect
        }
    };
    

  return (
    <div className="container">
      <h2 className="heading">Update Leave Request Form</h2>
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
  )
}

export default UpdateUser

