import { Container } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { logout } from "../features/userSlice";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const { picture: profile, name } = userData;
  const dispatch = useDispatch();

  return (
    <Container maxWidth='sm'>
      <div className='flex flex-col gap-10'>
        <div className='flex justify-between'>
          <div className='rounded-full overflow-hidden sm:w-44 w-36'>
            <img
              src={profile}
              alt={name}
              className='w-full h-full object-cover object-center'
            />
          </div>
          <div className='flex flex-col justify-center gap-5'>
            <h1 className='sm:text-5xl text-4xl font-bold'>{name}</h1>
            <p className='text-lg'>
              Total Posts: <span className='font-medium ml-0.5'>0</span>
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-xl font-semibold ml-1'>All Posts:</h1>
          <div>
            <Tooltip title='Make Post'>
              <Link to='/create' className='inline-block'>
                <div className='w-44 h-60 bg-neutral-200 flex justify-center items-center rounded-xl hover:bg-neutral-300 transition'>
                  <AddIcon fontSize={"large"} />
                </div>
              </Link>
            </Tooltip>
          </div>
        </div>
        <div className='mt-2 ml-1'>
          <button
            className='bg-neutral-100 border-2 border-neutral-800 py-2 px-5 rounded-lg text-lg hover:bg-neutral-200 transition'
            onClick={() => dispatch(logout())}
          >
            Sign Out
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
