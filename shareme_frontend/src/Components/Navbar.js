import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Search, SearchIconWrapper, StyledInputBase } from "./search";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo.png";
import { handleNav } from "../utils/Linking";
import { handleSearch } from "../utils/HandleFucntions";
import { useRef } from "react";

const Navbar = ({ user, toggleDrawer }) => {
  const inputRef = useRef();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        className='bg-gray-50 text-black drop-shadow-md'
        elevation={0}
      >
        <Toolbar className='flex justify-between md:flex-row flex-col-reverse gap-3 pt-3 pb-3'>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ "aria-label": "search" }}
              fullWidth
              inputRef={inputRef}
              onChange={(e) => {
                handleSearch(inputRef);
              }}
            />
          </Search>
          <Box className='flex items-center justify-between md:flex justify-between gap-0 w-full'>
            <IconButton
              className='md:hidden mr-2'
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
            <img
              className='md:hidden cursor-pointer'
              src={logo}
              alt='shareme'
              width={"150px"}
              onClick={() => handleNav("home")}
            />
            <Box className='flex items-center gap-3 ml-auto'>
              <Avatar
                className='cursor-pointer'
                alt='Remy Sharp'
                src={user?.image}
                sx={{ width: 46, height: 46 }}
                onClick={() => handleNav("profile", user?._id)}
              />
              <IconButton
                className='hidden md:inline-flex'
                onClick={() => handleNav("create", user?._id)}
              >
                <AddIcon sx={{ width: 30, height: 30 }} />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
