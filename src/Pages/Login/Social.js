import React, { useEffect, useState } from "react";
import auth from "../../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";

const Social = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [token, setToken] = useState("");

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

  return (
    <>
      <div className="divider">OR</div>
      {error ? <p className="text-center text-error">{error.message}</p> : ""}
      <button
        onClick={() => signInWithGoogle()}
        className="btn btn-block btn-outline"
      >
        Continue With Google
      </button>
    </>
  );
};

export default Social;
