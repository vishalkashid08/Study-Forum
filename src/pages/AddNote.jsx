import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    description: "",
    subject: "",
    fileUrl: "",
    userId: 1
  });

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/", note);
      alert("Note added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>➕ Add New Note</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="fileUrl"
          placeholder="File URL (PDF link)"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Save Note</button>
      </form>
    </div>
  );
};

export default AddNote;