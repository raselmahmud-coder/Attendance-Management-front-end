import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const handleRegistration = (e) => {
    setSpinner(true);
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const role = e.target.role.value;
    const password = e.target.password.value;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email.match(regexEmail) || name.length <= 4 || password.length <= 5) {
      toast.error(`Plz put valid info`, {
        toastId: "registration",
      });
    } else {
      fetch(`http://localhost:5000/user`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          password,
        }),
      }).then((data) => {
        if (data.status === 200) {
          setSpinner(false);
          navigate("/log-in");
          toast.success("you have registered, please log in", {
            toastId: "post",
          });
          e.target.reset();
        } else {
          setSpinner(false);
          toast.error("There was an error! Please try again later", {
            toastId: "post-error",
          });
        }
      });
    }
  };
  return (
    <>
      <div className="p-6 lg:w-1/3 mx-auto bg-base-100 drop-shadow rounded mt-12">
        <h2 className="text-3xl text-center">Registration</h2>
        <form onSubmit={handleRegistration}>
          <label htmlFor="email">Name</label>
          <input
            name="name"
            type="name"
            className="input w-full border-gray-300 border-2 mb-2"
            placeholder="Enter at least 5 letter"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter a valid email"
            name="email"
            type="email"
            className="input w-full border-gray-300 border-2 mb-2"
            required
          />
          <label htmlFor="role">Role</label>
          <select
            name="role"
            className="input w-full border-gray-300 border-2 mb-2"
            required>
            <option value={"student"}>Student</option>
            <option value={"teacher"}>Teacher</option>
          </select>
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter at least 6 characters"
            name="password"
            type="password"
            className="input w-full border-gray-300 border-2 mb-2"
            required
          />

          <input
            disabled={spinner}
            value={spinner ? "Loading..." : "Registration"}
            type="submit"
            className={`${
              spinner && "cursor-wait"
            } block btn-accent mx-auto w-full my-2 py-2 rounded-lg cursor-pointer uppercase`}
          />
          <div className="text-center my-2">
            Already have an account?{" "}
            <Link to={"/log-in"} className="text-primary">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
