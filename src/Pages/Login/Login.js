import React from "react";
import { Link } from "react-router-dom";
import Social from "./Social";

const Login = () => {
  return (
    <div className="w-full lg:w-1/3 mx-auto shadow-lg p-10 rounded-2xl my-5 lg:my-20">
      <h2 className="text-3xl text-primary text-center font-bold uppercase mb-5">
        Please Login
      </h2>
      <form className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Your Email here"
          class="input input-bordered input-accent w-full"
        />
        <input
          type="password"
          placeholder="Your Password here"
          class="input input-bordered input-accent w-full"
        />
        <button class="btn btn-block">Login</button>
      </form>
      <Social />
      <p className="w-full text-center font-semibold text-sm text-primary my-5">
        <Link to="/signup">New To TODO Handler ?</Link>
      </p>
    </div>
  );
};

export default Login;
