import { AppBar, Grid2, Switch, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hooks.ts';
import { toggleTheme } from '../../feauters/theme/themeSlice.ts';

const AppToolbar = () => {
  const dispatch = useAppDispatch();

  return (
    <AppBar position="static" sx={{mb: '20px'}}>
      <Toolbar>
        <Grid2 container sx={{alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography
            variant="h6"
            component="div"
            sx={{flexGrow: 1, alignItems: 'center'}}
          >
            Users
          </Typography>
          <Grid2>
            <Switch color="success" onChange={() => dispatch(toggleTheme())}/>
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;