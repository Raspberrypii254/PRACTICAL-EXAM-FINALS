import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);
  const fetchStudents = () => {
    
    axios
      .get("https://practical-exam-finals-five.vercel.app/students")
      .then((response) => {
        setStudents(response.data);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios
        .put(`https://practical-exam-finals-five.vercel.app/students/${editingId}`, { name, course, age })
        .then(() => {
          fetchStudents();
          resetForm();
        });

    } else {
      axios
        .post("https://practical-exam-finals-five.vercel.app/students", { name, course, age })
        .then(() => {
          fetchStudents();
          resetForm();
        });
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://practical-exam-finals-five.vercel.app/students/${id}`)
      .then(() => {
        fetchStudents();
      });
  };

  const resetForm = () => {
    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
  };
  
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Student Management System</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          {editingId ? "Update Student" : "Add Student"}
        </button>
        {editingId && (
          <button type="button" onClick={resetForm} style={{ marginLeft: "10px", padding: "5px 10px" }}>
            Cancel Edit
          </button>
        )}
      </form>
      <h2>Students</h2>
      {students.map((student) => (
        <div>
          <p>Name:{student.name}</p>
          <p>Course: {student.course}</p>
          <p>Age: {student.age}</p>
          <div style={{ marginTop: "15px" }}>
            <button onClick={() => handleEdit(student)} style={{ marginRight: "10px", padding: "5px 10px" }}>
              Edit
            </button>
            <button onClick={() => handleDelete(student._id)} style={{ marginRight: "10px", padding: "5px 10px"  }}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default App;