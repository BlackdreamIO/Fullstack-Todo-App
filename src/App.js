import "./App.css";
import CrudApp from "./CrudApp";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() 
{
    return (
        <div className="h-screen bg-black">
          <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <CrudApp/>
          </ThemeProvider>
        </div>
    );
}

