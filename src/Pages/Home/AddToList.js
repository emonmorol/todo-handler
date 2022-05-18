import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import auth from "../../firebase.init";

const AddToList = ({ refetch }) => {
  const [user] = useAuthState(auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const todoItem = {
      userEmail: user.email,
      title: data.title,
      description: data.description,
      isComplete: false,
    };
    swal("Yeah!", "Successfully Added ToDo List!", "success");
    fetch("https://todo-handlar.herokuapp.com/todoList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(todoItem),
    })
      .then((res) => res.json())
      .then((result) => {
        refetch();
        reset();
      });
  };

  return (
    <div className="w-full lg:w-1/4 border-2 p-10 rounded-2xl shadow-md h-96">
      <h2 className="text-3xl text-primary text-center font-bold uppercase mb-5">
        Add To Your List
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <input
            type="text"
            {...register("title", {
              required: {
                value: true,
                message: "This Field Is Required",
              },
              maxLength: {
                value: 30,
                message: "Title Can't be More Than 30 character",
              },
            })}
            placeholder="TODO Title here"
            className="input input-bordered input-primary w-full"
          />
          <small className="text-error ml-3">{errors.title?.message}</small>
        </div>
        <div>
          <textarea
            type="text"
            {...register("description", {
              required: {
                value: true,
                message: "This Field Is Required",
              },
              maxLength: {
                value: 80,
                message: "Description Can't be More Than 80 character",
              },
            })}
            placeholder="TODO description here"
            className="textarea textarea-primary w-full"
          />
          <small className="text-error ml-3">
            {errors.description?.message}
          </small>
        </div>
        <input
          type="submit"
          value="ADD"
          className="btn btn-block btn-primary"
        />
      </form>
    </div>
  );
};

export default AddToList;
