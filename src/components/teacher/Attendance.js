import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./table.css";

const Attendance = () => {
  const [getStudents, setGetStudents] = useState([]);
  const [spinner, setSpinner] = useState({ status: true, id: "" });
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    fetch(`https://rm-attendance-management.herokuapp.com/students`)
      .then((res) => res.json())
      .then((data) => {
        setGetStudents(data);
        setSpinner((s) => ({ ...s, status: false }));
      });
  }, [reFetch]);

  const handlePresentOrAbsent = (event, id) => {
    event.preventDefault();
    const isPresent = event.target.option.value;
    console.log(isPresent);
    setSpinner({ status: true, id });
    fetch(`https://rm-attendance-management.herokuapp.com/student`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        isPresent,
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
      <h2 className="text-3xl text-green-400 text-center my-5">
        Students Attendance {spinner.status && "Loading..."}
      </h2>
      <div>
        <table>
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
                <td data-column="SL">{index + 1}</td>
                <td data-column="Name">{student.name}</td>
                <td data-column="Email">{student.email}</td>
                <td data-column="Student ID" className="uppercase">
                  {student._id.substr(-2)}
                </td>
                <td data-column="Status">
                  <span
                    className={`
                      ${
                        student.present
                          ? "bg-green-400 text-white "
                          : "bg-gray-500 "
                      } p-1 rounded-lg`}>
                    {student?.present ? "Present" : "Absent"}
                  </span>
                </td>
                <td
                  data-column="Action"
                  className="flex justify-center items-center">
                  <form onSubmit={(e) => handlePresentOrAbsent(e, student._id)}>
                    <select name="option" className="bg-inherit">
                      <option className="bg-black" value={false}>
                        Absent
                      </option>
                      <option className="bg-black" value={true}>
                        Present
                      </option>
                    </select>
                    <input
                      type="submit"
                      disabled={spinner.status}
                      className={`${
                        spinner.status && "cursor-not-allowed "
                      }p-3 mx-2 cursor-pointer`}
                      value={
                        spinner.id === student._id ? "Loading..." : "Confirm"
                      }
                    />
                  </form>
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
