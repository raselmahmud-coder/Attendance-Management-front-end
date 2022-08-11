import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import LogIn from "./components/LogIn/LogIn";
import Registration from "./components/Registration/Registration";
import "react-toastify/dist/ReactToastify.css";
import Student from "./components/student/Student";
import Teacher from "./components/teacher/Teacher";
import Attendance from "./components/teacher/Attendance";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />}>
          <Route path="attendance" element={<Attendance />} />
          <Route path="routine" element={<Attendance />} />
        </Route>
        <Route
          path="*"
          element={
            <p className="text-2xl text-blue-400">There's nothing here!</p>
          }
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
