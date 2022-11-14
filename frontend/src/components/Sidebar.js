import { Drawer, SwipeableDrawer } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useWindowDimensions from "./getWindowDimensions";
import Tooltip from "@mui/material/Tooltip";

const Sidebar = () => {
  const { width } = useWindowDimensions();

  const navigate = useNavigate();

  if (width < 1200) {
    return (
      <SwipeableDrawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        anchor='left'
        open={true}
      >
        <div className='p-5'>
          <div className='w-44 cursor-pointer'>
            <img src={logo} alt='logo' className='w-full h-full' />
          </div>
        </div>
      </SwipeableDrawer>
    );
  } else {
    return (
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            p: 3,
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <NavLink to='/'>
          <Tooltip title='Home'>
            <div className='w-44 cursor-pointer'>
              <img src={logo} alt='logo' className='w-full h-full' />
            </div>
          </Tooltip>
        </NavLink>
      </Drawer>
    );
  }
};

{
  /*  */
}

export default Sidebar;
