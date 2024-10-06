import { AppBar, Grid2, Switch, Toolbar, Typography } from '@mui/material';
import { useAppDispatch } from '../../app/hooks.ts';
import { toggleTheme } from '../../feauters/theme/themeSlice.ts';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { FC } from 'react';

interface Props {
  isDarkMode: boolean
}

const AppToolbar: FC<Props> = ({isDarkMode}) => {
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
          <Switch color="success" onChange={() => dispatch(toggleTheme())}/>
          {isDarkMode ? <DarkModeIcon/> : <LightModeIcon/>}
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;