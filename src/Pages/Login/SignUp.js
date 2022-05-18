import React, { useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Social from "./Social";

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  useEffect(() => {
    fetch(`https://todo-handlar.herokuapp.com/user/${user?.user?.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("accessToken", result.token);
        setToken(result.token);
      });
  }, [user, token]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="w-full lg:w-1/3 mx-auto shadow-lg p-10 rounded-2xl my-5 lg:my-20 border-2">
      <h2 className="text-3xl text-primary text-center font-bold uppercase mb-5">
        Please Register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <input
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "This Field Is Required",
              },
            })}
            placeholder="Your Name Here"
            className="input input-bordered input-accent w-full"
          />
          <small className="text-error ml-3">{errors.name?.message}</small>
        </div>
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
            className="input input-bordered input-accent w-full"
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
            className="input input-bordered input-accent w-full"
          />
          <small className="text-error ml-3">{errors.password?.message}</small>
        </div>
        <p className="text-center">
          <small className="text-error ml-3">{error?.message}</small>
        </p>
        <input type="submit" value="Sign Up" className="btn btn-block" />
      </form>
      <Social />
      <p className="w-full text-center font-semibold text-sm text-primary my-5">
        <Link to="/login">Already Have An Account ?</Link>
      </p>
    </div>
  );
};

export default SignUp;
