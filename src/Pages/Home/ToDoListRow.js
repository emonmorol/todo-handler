import React from "react";

const ToDoListRow = ({ todo, refetch }) => {
  const { title, description, _id } = todo;

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

  return (
    <tr class="hover">
      <th>1</th>
      <td>{title}</td>
      <td>{description}</td>
      <td>
        <div className="flex gap-3">
          <button className="btn btn-xs btn-primary text-white">
            Complete
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
