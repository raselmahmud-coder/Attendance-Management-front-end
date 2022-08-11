import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogIn = () => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const handleForm = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email.match(regexEmail) || password.length <= 5) {
      toast.error(`Plz put valid info`, {
        toastId: "registration",
      });
    } else {
      fetch(`http://localhost:5000/user-login`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          data: JSON.stringify({
            email,
            password,
          }),
        },
      })
        .then((data) => {
          if (data.status === 200) {
            toast.success("you have logged in", {
              toastId: "login",
            });
            e.target.reset();
            return data.json();
          } else {
            toast.error("user not found", {
              toastId: "not-f",
            });
          }
        })
        .then((result) => {
          localStorage.setItem("access_token", result.token);
          if (result.role === "student") {
            navigate("/student");
          } else {
            navigate("/teacher");
          }
        });
    }
  };
  return (
    <>
      <div className="p-6 lg:w-1/3 mx-auto bg-base-100 drop-shadow rounded mt-12">
        <h2 className="text-3xl text-center">Login</h2>
        <form onSubmit={handleForm}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            className="input w-full border-gray-300 border-2"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            className="input w-full border-gray-300 border-2"
            required
          />
          <Link to={"/"} className="block mb-4">
            Forget Password?
          </Link>
          <input
            disabled={spinner}
            value={spinner ? "Loading..." : "Login"}
            type="submit"
            className={`${
              spinner && "cursor-wait"
            } block btn-accent mx-auto w-full py-2 rounded-lg cursor-pointer uppercase`}
          />
          <div className="text-center my-2">
            <Link to={"/registration"} className="text-primary">
              Create new account
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
