import { useEffect, useState } from "react"
import axios from "axios"

export default function App() {
  const [users, setUsers] = useState([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [editingUser, setEditingUser] = useState(null) 

  // Fetch all users (GET)
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    try {
      const res =axios.get("http://localhost:8080/api/user")
      setUsers(res.data)
    } catch (err) {
      console.error("Error fetching users:", err)
    }
  }

  // Add a new user (POST)
  const addUser =() => {
    if (!firstName || !lastName) return alert("Enter all fields")
    try {
      const res =axios.post("http://localhost:8080/api/user", {
        firstName,
        lastName,
      })
      setUsers([...users, res.data])
      setFirstName("")
      setLastName("")
    } catch (err) {
      console.error("Error adding user:", err)
    }
  }

  // Delete a user (DELETE)
  const deleteUser =(id) => {
    try {
      axios.delete(`http://localhost:8080/api/user/${id}`)
      setUsers(users.filter((u) => u.id !== id))
    } catch (err) {
      console.error("Error deleting user:", err)
    }
  }

  // Start editing user
  const startEdit = (user) => {
    setEditingUser(user)
    setFirstName(user.firstName)
    setLastName(user.lastName)
  }

  // Update user (PUT)
  const updateUser =  () => {
    try {
      const res =  axios.put(
        `http://localhost:8080/api/user/${editingUser.id}`,
        {
          firstName,
          lastName,
        }
      )

      setUsers(
        users.map((u) => (u.id === editingUser.id ? res.data : u))
      )
      setEditingUser(null)
      setFirstName("")
      setLastName("")
    } catch (err) {
      console.error("Error updating user:", err)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Hospital Management System</h1>

      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {editingUser ? (
        <button onClick={updateUser}>Update</button>
      ) : (
        <button onClick={addUser}>Add</button>
      )}

      <h2>Users</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "60%" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.firstName}</td>
                <td>{u.lastName}</td>
                <td>
                  <button onClick={() => startEdit(u)}>Edit</button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
