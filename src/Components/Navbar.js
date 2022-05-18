import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";

const Navbar = ({ children }) => {
  const [user] = useAuthState(auth);
  return (
    <nav class="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <div className="shadow-lg">
          <div class="w-full navbar max-w-7xl mx-auto">
            <div class="flex-1 px-2 mx-2 font-extrabold uppercase text-primary">
              <Link to="/">TO-DO Handler</Link>
            </div>
            <div class="flex-none lg:hidden">
              <label for="my-drawer-3" class="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>

            <div class="flex-none hidden lg:block">
              <ul class="menu menu-horizontal">
                {user ? (
                  <li>
                    <Link
                      onClick={() => {
                        signOut(auth);
                        localStorage.removeItem("accessToken");
                      }}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        {children}
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
          {user ? (
            <li>
              <Link onClick={() => signOut(auth)} to="/login">
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
