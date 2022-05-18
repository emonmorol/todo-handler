import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const ToDoListRow = ({ todo, refetch, index }) => {
  const { title, description, _id, isComplete } = todo;
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setComplete(isComplete);
  }, [isComplete]);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/todoList/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result?.acknowledged) {
              refetch();
              console.log(result);
              swal("Your To-Do Item has been deleted!", {
                icon: "success",
              });
            }
          });
      }
    });
  };
  const handleCompletation = (id) => {
    setComplete(true);
    fetch(`http://localhost:5000/todoList/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ completed: true }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.acknowledged) {
          refetch();
          console.log(result);
          swal(
            "Good job!",
            `You've Completed ${title} From To-Do List`,
            "success"
          );
          setComplete(true);
        }
      });
  };

  return (
    <tr class="hover">
      <th className={`${isComplete && "line-through"}`}>{index + 1}</th>
      <td className={`${isComplete && "line-through"}`}>{title}</td>
      <td className={`${isComplete && "line-through"}`}>{description}</td>
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
