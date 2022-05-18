import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import Social from "./Social";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    console.log(user);
  }

  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password);
    reset();
  };
  return (
    <div className="w-full lg:w-1/3 mx-auto shadow-lg p-10 rounded-2xl my-5 lg:my-20 border-2">
      <h2 className="text-3xl text-primary text-center font-bold uppercase mb-5">
        Please Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "This Field Is Required",
              },
            })}
            placeholder="Your Email here"
            class="input input-bordered input-accent w-full"
          />
          <small className="text-error ml-3">{errors.email?.message}</small>
        </div>
        <div>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "This Field Is Required",
              },
            })}
            placeholder="Your Password here"
            class="input input-bordered input-accent w-full"
          />
          <small className="text-error ml-3">{errors.password?.message}</small>
        </div>
        <p className="text-center">
          <small className="text-error ml-3">{error?.message}</small>
        </p>
        <input type="submit" value="Sign Up" class="btn btn-block" />
      </form>
      <Social />
      <p className="flex justify-between w-full text-center font-semibold text-sm text-primary my-5">
        <button>Forget Password ?</button>
        <Link to="/signup">New To TODO Handler ?</Link>
      </p>
    </div>
  );
};

export default Login;
