import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    subject: "",
    userId: 1
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");
      setNotes(response.data.reverse());
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleChange = (e) => {
    setNoteData({
      ...noteData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("❌ Please select a file");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", noteData.title);
      formData.append("description", noteData.description);
      formData.append("subject", noteData.subject);
      formData.append("userId", noteData.userId);

      await API.post("/notes/upload", formData);
      alert("✅ Note uploaded!");

      setNoteData({
        title: "",
        description: "",
        subject: "",
        userId: 1
      });
      setFile(null);
      e.target.reset();
      fetchNotes();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await API.delete(`/notes/${id}`);
        fetchNotes();
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const handleOpenFile = (fileUrl) => {
    console.log("Opening file:", fileUrl);
    if (!fileUrl) {
      alert("File not found!");
      return;
    }
    window.open(fileUrl, "_blank");
  };

  // Animation Variant Helpers
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div style={{ padding: "30px 20px", maxWidth: "1100px", margin: "auto", fontFamily: "'Segoe UI', Roboto, sans-serif", color: "#333" }}>
      
      {/* Title Header Animation */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        <h2 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1a202c", margin: "0 0 10px 0" }}>
          📚 Study Resource Hub
        </h2>
        <p style={{ color: "#718096", fontSize: "1.1rem", margin: 0 }}>
          Upload, organize, and download your academic notes.
        </p>
      </motion.div>

      {/* Upload Form Container with Scale Transition */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ background: "#fff", padding: "30px", borderRadius: "16px", marginBottom: "40px", boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)", border: "1px solid #e2e8f0" }}
      >
        <h3 style={{ margin: "0 0 20px 0", fontSize: "1.35rem", fontWeight: "600", color: "#2d3748" }}>📤 Upload New Material</h3>

        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#4a5568" }}>Note Title</label>
              <input 
                name="title" 
                placeholder="Title" 
                value={noteData.title} 
                onChange={handleChange} 
                required 
                style={{ padding: "10px 14px", border: "1px solid #cbd5e0", borderRadius: "8px", fontSize: "0.95rem", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#4a5568" }}>Subject</label>
              <input 
                name="subject" 
                placeholder="Subject" 
                value={noteData.subject} 
                onChange={handleChange} 
                required 
                style={{ padding: "10px 14px", border: "1px solid #cbd5e0", borderRadius: "8px", fontSize: "0.95rem", outline: "none" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#4a5568" }}>Description</label>
            <input 
              name="description" 
              placeholder="Description" 
              value={noteData.description} 
              onChange={handleChange} 
              required 
              style={{ padding: "10px 14px", border: "1px solid #cbd5e0", borderRadius: "8px", fontSize: "0.95rem", outline: "none" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px", background: "#f8fafc", border: "2px dashed #cbd5e0", padding: "16px", borderRadius: "8px", alignItems: "center" }}>
            <input type="file" onChange={handleFileChange} required style={{ fontSize: "0.9rem", color: "#718096" }} />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#2b6cb0" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{ padding: "12px 24px", background: "#3182ce", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", alignSelf: "flex-end", boxShadow: "0 4px 6px -1px rgba(49, 130, 206, 0.3)", transition: "box-shadow 0.2s" }}
          >
            Upload
          </motion.button>
        </form>
      </motion.div>

      {/* Notes List Section */}
      <h3 style={{ margin: "0 0 24px 0", fontSize: "1.5rem", fontWeight: "600", color: "#2d3748" }}>💡 Repository Feed</h3>

      {notes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center", padding: "40px", border: "1px dashed #e2e8f0", borderRadius: "12px", background: "#f8fafc" }}
        >
          <p style={{ margin: 0, color: "#a0aec0", fontSize: "1.1rem" }}>No notes uploaded</p>
        </motion.div>
      ) : (
        <motion.div 
          layout 
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}
        >
          <AnimatePresence mode="popLayout">
            {notes.map((note) => (
              <motion.div 
                key={note.id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }}
                layout
                style={{ border: "1px solid #e2e8f0", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)", background: "#fff", height: "210px" }}
              >
                <div style={{ flexGrow: 1, overflow: "hidden" }}>
                  <div style={{ marginBottom: "8px" }}>
                    <span style={{ display: "inline-block", background: "#ebf8ff", color: "#2b6cb0", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", padding: "4px 8px", borderRadius: "6px" }}>
                      {note.subject}
                    </span>
                  </div>
                  
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", fontWeight: "600", color: "#1a202c", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {note.title}
                  </h4>
                  
                  <p style={{ margin: 0, color: "#4a5568", fontSize: "0.92rem", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {note.description}
                  </p>
                </div>

                {/* Card Action Controls */}
                <div style={{ display: "flex", gap: "10px", marginTop: "16px", borderTop: "1px solid #f7fafc", paddingTop: "12px" }}>
                  <motion.button 
                    whileHover={{ scale: 1.03, backgroundColor: "#e2e8f0" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleOpenFile(note.fileUrl)}
                    style={{ flex: 1, padding: "8px 12px", background: "#edf2f7", color: "#2d3748", border: "none", borderRadius: "6px", fontSize: "0.88rem", fontWeight: "600", cursor: "pointer" }}
                  >
                    📄 Open File
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.03, backgroundColor: "#fff5f5", borderColor: "#fc8181" }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleDelete(note.id)}
                    style={{ padding: "8px 12px", background: "#ffffff", color: "#e53e3e", border: "1px solid #fed7d7", borderRadius: "6px", fontSize: "0.88rem", fontWeight: "500", cursor: "pointer" }}
                  >
                    🗑 Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default NotesList;