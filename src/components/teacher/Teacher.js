import { FaUserCog } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

const Teacher = () => {
  return (
    <div>
      <h1 className="text-3xl text-center capitalize my-4">
        welcome Teacher dashboard
      </h1>
      <div className="grid grid-cols-2">
        <div className="drawer-mobile">
          <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

          <div className="drawer-side">
            <label for="mobile-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
              <li>
                <Link to="/teacher/attendance" className="">
                  <FaUserCog />
                  Attendance
                </Link>
              </li>
              <li>
                <Link className="" to="/teacher/routine">
                  <AiOutlineCalendar />
                  Routine
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-10/12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Teacher;
