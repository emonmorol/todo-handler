import React from "react";
import AddToList from "./AddToList";
import ToDoList from "./ToDoList";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Home = () => {
  const [user] = useAuthState(auth);
  const {
    data: todos,
    isLoading,
    refetch,
  } = useQuery(["todoItmes", user?.email], () =>
    fetch(`https://todo-handlar.herokuapp.com/todoList/${user?.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <>
      <h2 className="text-center text-4xl text-primary font-bold my-5">
        You Can See Only Your TODO List
      </h2>
      <div className="p-10 flex flex-col lg:flex-row gap-5">
        <AddToList refetch={refetch} />
        <ToDoList todos={todos} refetch={refetch} />
      </div>
    </>
  );
};

export default Home;
