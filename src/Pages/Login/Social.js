import React, { useState } from "react";
import auth from "../../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const Social = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    console.log(user);
  }

  return (
    <>
      <div class="divider">OR</div>
      {error ? <p className="text-center text-error">{error.message}</p> : ""}
      <button
        onClick={() => signInWithGoogle()}
        class="btn btn-block btn-outline"
      >
        Continue With Google
      </button>
    </>
  );
};

export default Social;
