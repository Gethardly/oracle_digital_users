import { FC, PropsWithChildren, ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks.ts';
import { selectThemeMode } from '../../feauters/theme/themeSlice.ts';
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import AppToolBar from '../../components/AppToolBar/AppToolBar.tsx';

interface Props extends PropsWithChildren {
  children: ReactNode;
}

const Layout: FC<Props> = ({children}) => {
  const isDarkMode = useAppSelector(selectThemeMode);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppToolBar isDarkMode={isDarkMode}/>
      <Box component="main">
        <Container>{children}</Container>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;