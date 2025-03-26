import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    aadhar: "",
    dob: "",
    mobile: "",
    address: "",
    pincode: "",
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/users", formData).then((res) => {
      setUsers([...users, res.data]);
      setFormData({ name: "", fatherName: "", aadhar: "", dob: "", mobile: "", address: "", pincode: "" });
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`).then(() => {
      setUsers(users.filter((user) => user._id !== id));
    });
  };

  return (
    <div className="bg-light-brown min-h-screen p-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Tirumala Tirupati Devasthanams</h1>
        <img src="/ttd-temple.jpg" alt="TTD Temple" className="mx-auto w-32" />
      </div>
      <div className="flex justify-between mt-5">
        <form onSubmit={handleSubmit} className="w-1/3 p-5 bg-white shadow-md rounded-md">
          {Object.keys(formData).map((field) => (
            <div key={field} className="mb-3">
              <label className="block text-sm font-medium">{field.toUpperCase()}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Submit</button>
        </form>
        <div className="w-1/2 bg-white shadow-md p-5 rounded-md">
          <h2 className="text-lg font-semibold mb-3">User Details</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">S.No</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Aadhar</th>
                <th className="border p-2">Mobile</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.aadhar}</td>
                  <td className="border p-2">{user.mobile}</td>
                  <td className="border p-2">
                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
