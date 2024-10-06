import { Box, CircularProgress } from '@mui/material';
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <Box className={classes.overlay}>
      <Box className={classes.loader}>
        <CircularProgress size="15rem"/>
      </Box>
    </Box>
  );
};

export default Loader;