import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Grid } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <Box className='flex w-full flex-col items-center p-10'>
      <Grid type='Circles' color='#EF4444' height={50} width={200} />
      <Typography className='text-center mt-5' variant='h6'>
        {message}
      </Typography>
    </Box>
  );
};

export default Spinner;
