import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExpenseForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showExpenses, setShowExpenses] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error Fetching Expenses:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const expenseData = { title, amount, category, date, notes };

    try {
      await axios.post("http://localhost:5000/expenses", expenseData);
      fetchExpenses();
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      setNotes("");
    } catch (error) {
      console.error("Error Adding Expense:", error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const expense = expenses[index];
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
    setNotes(expense.notes);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/expenses/${id}`, { title, amount, category, date, notes });
      setEditingIndex(null);
      fetchExpenses();
    } catch (error) {
      console.error("Error Saving Expense:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error Deleting Expense:", error);
    }
  };

  return (
    <div className="expense">
      <center>
        <h2>Expenses</h2>
        <form id="forms" onSubmit={handleSubmit}>
          <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div>
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Medical">Medical</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
          </div>
          <button type="submit">Add Expense</button>
          <button type="button" onClick={() => navigate("/")}>Go Back</button>
        </form>

        <button onClick={() => setShowExpenses(!showExpenses)} style={{ marginTop: "20px", padding: "10px" }}>
          {showExpenses ? "Hide Expenses" : "Show Expenses"}
        </button>
      </center>

      {showExpenses && (
        <div className="expense-popup">
          <h3>Expense List</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={expense._id}>
                  <td>{editingIndex === index ? <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> : expense.title}</td>
                  <td>{editingIndex === index ? <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /> : expense.amount}</td>
                  <td>{editingIndex === index ? (
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="Food">Food</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Medical">Medical</option>
                      <option value="Others">Others</option>
                    </select>
                  ) : expense.category}</td>
                  <td>{editingIndex === index ? <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /> : expense.date}</td>
                  <td>{editingIndex === index ? <textarea value={notes} onChange={(e) => setNotes(e.target.value)}></textarea> : expense.notes}</td>
                  <td>
                    {editingIndex === index ? (
                      <button onClick={() => handleSave(expense._id)}>Save</button>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(expense._id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseForm;
