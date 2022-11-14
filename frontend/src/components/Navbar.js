import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import Authentication from "../pages/Authentication";

const Navbar = () => {
  const [inputSel, setInputSel] = useState(false);
  const { userData } = useSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <nav className='w-full bg-white p-4 sticky top-0 shadow-md px-8 flex justify-between items-center z-10'>
      <div className={`rounded-sm`}>
        <form action='' className='flex w-max'>
          <input
            type='text'
            placeholder='Search'
            style={{ backgroundColor: "rgba(0,0,0,0.1)", outline: "none" }}
            className={`p-2 rounded-l-sm px-3 border-b-2 ${
              inputSel ? "w-64 border-neutral-400" : "w-56 border-white"
            } transition-all`}
            onFocus={() => setInputSel(true)}
            onBlur={() => setInputSel(false)}
          />
          <button
            style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
            className={`rounded-r-sm border-b-2 transition px-2 self-stretch ${
              inputSel ? "border-neutral-400" : "border-white"
            } `}
          >
            <SearchIcon sx={{ color: "rgba(0,0,0,0.5)" }} />
          </button>
        </form>
      </div>
      {Object.keys(userData).length !== 0 ? (
        <div className='flex items-center gap-5'>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              isActive ? "bg-neutral-200 rounded-full" : "bg-white rounded-full"
            }
          >
            <Tooltip title='Profile'>
              <div className='p-1 flex items-center justify-center cursor-pointer transition rounded-full hover:bg-neutral-200 w-11'>
                <div className='rounded-full overflow-hidden'>
                  <img
                    src={userData.picture}
                    alt={userData.name}
                    className='w-full h-full'
                  />
                </div>
              </div>
            </Tooltip>
          </NavLink>
          <NavLink
            to='/create'
            className={({ isActive }) =>
              isActive ? "bg-neutral-200 rounded-full" : "bg-white rounded-full"
            }
          >
            <Tooltip title='Make Post'>
              <div
                className='p-1.5 flex items-center justify-center cursor-pointer transition rounded-full hover:bg-neutral-200'
                onClick={() => navigate("/create")}
              >
                <AddIcon sx={{ color: "rgba(0,0,0,0.5)", fontSize: 30 }} />
              </div>
            </Tooltip>
          </NavLink>
        </div>
      ) : (
        <button
          className='bg-neutral-200 rounded-md py-2 px-4'
          onClick={() => navigate("/auth")}
        >
          Login / Signup
        </button>
      )}
    </nav>
  );
};

export default Navbar;
