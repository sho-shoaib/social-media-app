import { useState, useEffect, useRef } from "react";
import { Link, Route, Routes } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Sidebar, Profile, Navbar } from "../Components";
import { client } from "../Client";
import logo from "../assets/logo.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { Box } from "@mui/system";
import Feed from "./Feed";

const Home = () => {
  const [user, setUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(true);
  // const scrollRef = useRef(null);

  const toggleDrawer = (open) => {
    setOpenDrawer(open);
  };

  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo.googleId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  // useEffect(() => {
  //   scrollRef.current.scrollTo(0, 0);
  // }, []);

  return (
    <Box className='bg-gray-50 w-full flex'>
      <Sidebar
        user={user && user}
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
      />
      <Box className='w-full h-screen'>
        <Navbar user={user && user} toggleDrawer={toggleDrawer} />
        <Feed />
      </Box>
    </Box>
  );
};

export default Home;
