import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { client } from "../Client";

const Login = () => {
  const navigate = useNavigate();

  const googleResponse = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <Box className=' h-screen'>
      <Box className='relative w-full h-full'>
        <video
          className='w-full h-full object-cover'
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
        />
      </Box>
      <Box className='absolute top-0 right-0 left-0 bottom-0 bg-blackOverlay grid place-items-center'>
        <Box className='flex flex-col items-center p-5'>
          <img src={logo} width='130px' alt='shareMe' />
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => {
              return (
                <Button
                  variant='contained'
                  startIcon={<GoogleIcon sx={{ color: "#1c54b2" }} />}
                  sx={{
                    backgroundColor: "#fff !important",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.9) !important",
                    },
                  }}
                  className='mt-6 p-3 pr-4 pl-4 rounded-lg'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  sign in with google
                </Button>
              );
            }}
            onSuccess={googleResponse}
            onFailure={googleResponse}
            cookiePolicy='single_host_origin'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
