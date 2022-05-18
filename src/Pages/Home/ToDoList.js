import React from "react";
import ToDoListRow from "./ToDoListRow";

const ToDoList = ({ todos, refetch }) => {
  return (
    <div class="overflow-x-auto w-full p-5 lg:w-3/4">
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
          {todos &&
            todos?.map((todo, index) => (
              <ToDoListRow
                key={todo._id}
                index={index}
                todo={todo}
                refetch={refetch}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoList;
