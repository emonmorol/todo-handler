import React, { useState } from "react";
import auth from "../../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const Social = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [firebaseError, setFirebaseError] = useState("");

  if (error) {
    setFirebaseError(error.message);
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    console.log(user);
  }

  return (
    <>
      <div class="divider">OR</div>
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
