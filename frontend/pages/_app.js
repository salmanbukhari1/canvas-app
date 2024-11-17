// frontend/pages/_app.js
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Header from '../components/Layout/header';
import AuthProvider from '../components/Auth/authProvider';
import Container from '../components/Layout/container';

function MyApp({ Component, pageProps }) {

    return (
      <Provider store={store}>
        <Header />
          <AuthProvider>
            <Container>
                <Component {...pageProps} />
            </Container>
          </AuthProvider>
      </Provider>
    );
}

export default MyApp;
