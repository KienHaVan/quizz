import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './constants';
import { Router } from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ width: 1200 }}>
        <Router />
      </Container>
    </ThemeProvider>
  );
}

export default App;
