import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Attendance = () => {
  const [getStudents, setGetStudents] = useState([]);
  const [spinner, setSpinner] = useState({ status: false, id: "" });
  const [toggle, setToggle] = useState(false);
  const [reFetch, setReFetch] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5000/students`)
      .then((res) => res.json())
      .then((data) => setGetStudents(data));
  }, [reFetch]);
  const handlePresentOrAbsent = (id) => {
    setSpinner({ status: true, id });
    fetch(`http://localhost:5000/student`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        toggle,
      }),
    }).then((res) => {
      setReFetch(!reFetch);
      setSpinner({ ...spinner, status: false });
      if (res.status === 200) {
        toast.success("You have updated student present", {
          toastId: "success",
        });
      } else {
        toast.error("There was an error occur!", {
          toastId: "error",
        });
      }
    });
  };
  return (
    <>
      <h2 className="text-3xl text-red-400 text-center my-5">
        Students Attendance
      </h2>
      <div>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Student ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getStudents.map((student, index) => (
              <tr key={student._id}>
                <th>{index + 1}</th>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="uppercase">{student._id.substr(-2)}</td>
                <td>{student?.present ? "Present" : "Absent"}</td>
                <td className="flex justify-center items-center">
                  <input
                    type="checkbox"
                    name="check"
                    onClick={() => setToggle(!toggle)}
                    className="checkbox border-white"
                  />
                  <button
                    disabled={spinner.status}
                    onClick={() => handlePresentOrAbsent(student._id)}
                    className="p-3 mx-2">
                    {spinner.id === student._id ? "Loading..." : "Confirm"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Attendance;
