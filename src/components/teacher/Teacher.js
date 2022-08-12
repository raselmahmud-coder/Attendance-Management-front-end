import { FaUserCog } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

const Teacher = () => {
  return (
    <>
      <h1 className="text-3xl text-center capitalize my-4">
        welcome Teacher dashboard
      </h1>
        <div className="drawer drawer-mobile">
          <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
          <div className="p-4 drawer-content w-full">
          <Outlet />
          </div>
          <div className="drawer-side">
            <label htmlFor="mobile-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 overflow-y-auto w-40 bg-base-100 text-base-content">
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
        
      </>
   
  );
};

export default Teacher;
