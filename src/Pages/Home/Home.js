import React from "react";
import AddToList from "./AddToList";
import ToDoList from "./ToDoList";
import { useQuery } from "react-query";

const Home = () => {
  const {
    data: todos,
    isLoading,
    refetch,
  } = useQuery("todoItmes", () =>
    fetch("http://localhost:5000/todoList").then((res) => res.json())
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-20 flex flex-row gap-5">
      <AddToList refetch={refetch} />
      <ToDoList todos={todos} refetch={refetch} />
    </div>
  );
};

export default Home;
