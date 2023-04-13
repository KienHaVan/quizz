import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { theme } from './constants';
import { Router } from './routes';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Router />
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
