import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import { SnackbarProvider } from 'notistack';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss={false}
          draggable={true}
          pauseOnHover={true}
          limit={3}
          toastStyle={{ backgroundColor: '#000', color: '#fff' }}
        />
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Routes>
              {publicRoutes.map((route: any, index: number) => {
                const Layout = route.layout || DefaultLayout;
                const Page = route.component;
                return <Route key={index} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>} />
              })}
            </Routes>
          </Router>
        </SnackbarProvider>
      </Provider>
    </>
  );
}

export default App;
