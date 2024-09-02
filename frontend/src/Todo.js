import { useEffect, useState } from "react";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const apiUrl = "http://localhost:8080";

  const handleSubmit = async () => {
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      await fetch(apiUrl + "/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then(async (response) => {
          if (response.ok) {
            const result =  await response.json();
            setTodos([...todos, { title, description, id: result.id }]);
            setTitle("");
            setDescription("");
            setMessage("Item Added successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
          } else {
            setError("Unable to create Todo item");
          }
        })
        .catch((error) => {
          setError("Unable to create Todo item " + error);
        });
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleEditCancel = () => {
    setEditId(-1);
  };

  const handleUpdate = () => {
    setError("");
    if (editTitle.trim() !== "" && editDescription.trim() !== "") {
      fetch(apiUrl + "/todo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: editId,
          title: editTitle,
          description: editDescription
        }),
      })
        .then((response) => {
          if (response.ok) {
            const updatedTodo = todos.map((item) => {
              if (item.id === editId) {
                item.title = editTitle;
                item.description = editDescription;
              }
              return item;
            });
            setTodos(updatedTodo);
            setMessage("Item Updated Successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            setEditId(-1);
          } else {
            setError("Unable to update Todo item");
          }
        })
        .catch((error) => {
          setError("Unable to update Todo item " + error);
        });
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wnt to delete")) {
      fetch(apiUrl + "/todo/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          const updatedTodo = todos.filter((item) => item.id !== id);
          setTodos(updatedTodo);
          setMessage("Item deleted Successfully");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        })
        .catch((error) => {
          setError("Unable to delete");
        });
    }
  };

  const getItems = () => {
    fetch(apiUrl + "/todo")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTodos(res);
      });
  };

  return (
    <>
      <div className="row p-3 bg-success text-light">
        <h1>TODO</h1>
      </div>
      <div className="row m-2">
        <h3>Add Item</h3>
        {message && <p className="text-success">{message}</p>}
        <div className="form-group d-flex gap-2">
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="form-control"
            type="text"
          ></input>
          <input
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control"
            type="text"
          ></input>
          <button class="btn btn-dark" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <div className="row mt-3 m-2">
        <h3>Tasks</h3>
        <div className="col-md-6">
          <ul className="list-group">
            {todos.map((item) => (
              <li className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                <div className="d-flex flex-column me-2">
                  {editId === -1 || editId !== item.id ? (
                    <>
                      <span className="fw-bold">{item.title}</span>
                      <span>{item.description}</span>
                    </>
                  ) : (
                    <>
                      <input
                        placeholder="Title"
                        onChange={(e) => setEditTitle(e.target.value)}
                        value={editTitle}
                        className="form-control"
                        type="text"
                      ></input>
                      <input
                        placeholder="Description"
                        onChange={(e) => setEditDescription(e.target.value)}
                        value={editDescription}
                        className="form-control"
                        type="text"
                      ></input>
                    </>
                  )}
                </div>
                <div className="d-flex gap-2">
                  {editId === -1 || editId !== item.id ? (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleUpdate()}
                    >
                      Update
                    </button>
                  )}
                  {editId === -1 || editId !== item.id ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleEditCancel()}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}