import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;


/*
const { user, userData, userItems } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCost, setEditCost] = useState("");

  const handleAddItem = () => {
    if (!itemName || !itemCost) return;
    dispatch(addItemForUser(itemName, parseFloat(itemCost)));
    setItemName(""); setItemCost("");
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditCost(item.cost);
  };

  const handleEditSubmit = () => {
    if (!editName || !editCost) return;
    dispatch(updateItemForUser(editId, { name: editName, cost: parseFloat(editCost) }));
    setEditId(null);
    setEditName(""); setEditCost("");
  };

<div style={{ padding: "20px" }}>
      {user ? (
        <>
          <h2>Welcome {userData?.name || user.email}</h2>
          <button onClick={() => dispatch(logoutUser())}>Logout</button>

          <h3>Add Item</h3>
          <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
          />
          <input
            type="number"
            value={itemCost}
            onChange={(e) => setItemCost(e.target.value)}
            placeholder="Cost"
          />
          <button onClick={handleAddItem}>Add</button>

          <h3>Your Items</h3>
          <ul>
            {userItems.map(item =>
              editId === item.id ? (
                <li key={item.id}>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Name"
                  />
                  <input
                    type="number"
                    value={editCost}
                    onChange={(e) => setEditCost(e.target.value)}
                    placeholder="Cost"
                  />
                  <button onClick={handleEditSubmit}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </li>
              ) : (
                <li key={item.id}>
                  {item.name} - ${item.cost}
                  <button onClick={() => startEdit(item)}>Edit</button>
                  <button onClick={() => dispatch(deleteItemForUser(item.id))}>Delete</button>
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <>
          <button onClick={() => dispatch(loginUser("test@example.com", "password123"))}>Login</button>
          <button onClick={() => dispatch(registerUser("test@example.com", "password123", { name: "User" }))}>Register</button>
        </>
      )}
    </div>
*/