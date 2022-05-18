import React, { useEffect } from "react";
import auth from "../../firebase.init";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";

const Social = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  if (loading) {
    return <p>Loading...</p>;
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
