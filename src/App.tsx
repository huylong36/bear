import { PicLeftOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Header } from 'antd/es/layout/layout';
import { lazy, ReactNode, Suspense, useMemo } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import ModuleLoading from './components/ModuleUploading';
import PrivateRoute from './components/PrivateRoute';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { Router } from './routes';
import './index.scss'
import { requestLogout } from "./redux/slices/userSlices";
type MenuItem = {
  key: string;
  label: ReactNode;
  children?: Array<MenuItem>;
  icon?: ReactNode;
}
const LoginForm = lazy(() => import("./components/LoginForm"));
const menuItems: Array<MenuItem> = [
  {
    key: "0",
    label: "Tin tức",
    icon: <PicLeftOutlined />,
    children: [
      {
        key: Router.NewsCategory,
        label: <Link to={Router.NewsCategory}>Danh mục tin tức</Link>
      },
      {
        key: Router.News,
        label: <Link to={Router.News}>Bài viết</Link>
      }
    ]
  },
  {
    key: "1",
    label: "Nội dung",
    icon: <PicLeftOutlined />,
    children: [
      {
        key: Router.Category,
        label: <Link to={Router.Category}>Danh mục sản phẩm</Link>
      },
      {
        key: Router.Home,
        label: <Link to={Router.Home}>Sản phẩm</Link>
      }
    ]
  }
];
function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogin = useAppSelector(store => store.userState.isLogin)
  console.log("isLogin" , isLogin);
  const currPath = window.location.pathname;
  const { openKeys, selectedKeys } = useMemo(() => {
    const openKeys = menuItems.filter((item) => !!item.children?.find((c) => c.key === currPath)).map((item) => item.key)
    const selectedKeys = menuItems.flatMap((item) => [item.key, ...(item.children || []).map((e) => e.key)]).filter((key) => key === currPath)
    return { openKeys, selectedKeys }
  }, [currPath]);
  return <Layout id="main-app" hasSider>
  {isLogin && <Layout.Sider className="fixed-sider" collapsible>
    <Header>
      <Button type="primary" onClick={() => {
        dispatch(requestLogout())
      }}>Logout</Button>
    </Header>
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={selectedKeys}
      items={menuItems}
    />
  </Layout.Sider>}
  <Layout.Content id="main-content">
    <Suspense fallback={<ModuleLoading />}>
      <Routes>
        {/* News */}
        <Route path={Router.NewsCategory} element={<PrivateRoute><></></PrivateRoute>} />
        <Route path={Router.Home} element={<PrivateRoute><>xxxx</></PrivateRoute>} />
        <Route path={Router.Login} element={isLogin ? <Navigate to="/" /> : <LoginForm onSuccess={() => {
          navigate(Router.Home)
        }} />} />
      </Routes>
    </Suspense>
  </Layout.Content>
</Layout>
}

export default App;
