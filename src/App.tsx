import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/Layout'
import { Provider } from 'react-redux';
import { store } from './redux/store';
function App() {
  return (
    <>
      <Provider store={store}>
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
      </Provider>
    </>
  );
}

export default App;
