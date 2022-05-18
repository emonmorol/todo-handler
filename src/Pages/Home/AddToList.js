import React from "react";
import { useForm } from "react-hook-form";

const AddToList = ({ refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (todoItem) => {
    console.log(todoItem);
    fetch("http://localhost:5000/todoList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoItem),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));

    reset();
    refetch();
  };

  return (
    <div className="w-1/4 border-2 p-10 rounded-2xl shadow-md h-96">
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
            })}
            placeholder="TODO Title here"
            class="input input-bordered input-primary w-full"
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
            })}
            placeholder="TODO description here"
            class="textarea textarea-primary w-full"
          />
          <small className="text-error ml-3">
            {errors.description?.message}
          </small>
        </div>
        <input type="submit" value="ADD" class="btn btn-block btn-primary" />
      </form>
    </div>
  );
};

export default AddToList;
