import React from "react";
import ToDoListRow from "./ToDoListRow";

const ToDoList = ({ todos, refetch }) => {
  return (
    <div class="overflow-x-auto  w-3/4">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Title</th>
            <th>Short Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((todo) => (
            <ToDoListRow key={todo._id} todo={todo} refetch={refetch} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
