import React, { useEffect, useState } from "react";

const ToDoListRow = ({ todo, refetch, index }) => {
  const { title, description, _id, isComplete } = todo;
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setComplete(isComplete);
  }, [isComplete]);

  const handleDelete = (id) => {
    const proceed = window.confirm("are you sure");
    if (proceed) {
      fetch(`http://localhost:5000/todoList/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result?.acknowledged) {
            refetch();
            console.log(result);
          }
        });
    }
  };
  const handleCompletation = (id) => {
    setComplete(true);
    fetch(`http://localhost:5000/todoList/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.acknowledged) {
          refetch();
          console.log(result);
          setComplete(true);
        }
      });
  };

  return (
    <tr class="hover">
      <th>{index + 1}</th>
      <td>{title}</td>
      <td>{description}</td>
      <td>
        <div className="flex gap-3">
          <button
            onClick={() => handleCompletation(_id)}
            className="btn btn-xs btn-primary text-white"
            disabled={complete}
          >
            {complete ? "Completed" : "Complete"}
          </button>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-xs btn-error text-white"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ToDoListRow;
