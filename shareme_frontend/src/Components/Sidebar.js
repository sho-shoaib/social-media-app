import { Box } from "@mui/material";
import React from "react";
import logo from "../assets/logo.png";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { List } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { handleNav } from "../utils/Linking";

export const list = [
  "Animals",
  "Wallpapers",
  "Photography",
  "Gaming",
  "Coding",
];

const Sidebar = ({ openDrawer, toggleDrawer, user }) => {
  return (
    <>
      <Drawer
        variant='permanent'
        anchor='left'
        className='hidden h-screen w-64 bg-white md:inline-block'
        classes={{ paper: "w-64" }}
      >
        <Box className='w-full'>
          <Box className='flex flex-col items-start gap-4 p-3 pt-5'>
            <img
              src={logo}
              alt='shareme'
              width='150px'
              className='hidden md:block cursor-pointer'
              onClick={() => handleNav("home")}
            />
            <List className='w-full'>
              <ListItem button onClick={() => handleNav("home")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
              <ListItem
                button
                className='flex md:hidden'
                onClick={() => handleNav("create", user?._id)}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={"Create"} />
              </ListItem>
            </List>
            <Typography variant='h6'>Discover categories</Typography>
            <List className='w-full'>
              {list.map((item, i) => {
                return (
                  <ListItem button key={i} onClick={() => handleNav(item)}>
                    <ListItemText primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </Drawer>

      <Drawer
        variant='temporary'
        anchor='left'
        className='inline-block h-screen w-64 bg-white md:hidden'
        open={openDrawer}
        onClose={() => toggleDrawer(false)}
        classes={{ paper: "w-64" }}
      >
        <Box className='w-full'>
          <Box className='flex flex-col items-start gap-4 p-3 pt-5'>
            <img
              src={logo}
              alt='shareme'
              width='150px'
              className='hidden md:block cursor-pointer'
              onClick={() => handleNav("home")}
            />
            <List className='w-full'>
              <ListItem button onClick={() => handleNav("home")}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Home"} />
              </ListItem>
              <ListItem
                button
                className='flex md:hidden'
                onClick={() => handleNav("/profile/create")}
              >
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary={"Create"} />
              </ListItem>
            </List>
            <Typography variant='h6'>Discover categories</Typography>
            <List className='w-full'>
              {list.map((item, i) => {
                return (
                  <ListItem button key={i} onClick={() => handleNav(item)}>
                    <ListItemText primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
