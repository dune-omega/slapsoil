import { ProLayout } from "@ant-design/pro-components";
import { Typography } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.webp";
import MenuArr from "./menus";

const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <ProLayout
        fixSiderbar
        title="Slap Soil"
        logo={<img src={logo} alt="logo" height={35} width={35} />}
        route={{
          routes: MenuArr,
        }}
        menuItemRender={(item, dom) => (
          <Typography.Link onClick={() => navigate(`${item.path}`)}>
            {dom}
          </Typography.Link>
        )}
      >
        <Outlet />
      </ProLayout>
    </>
  );
};

export default App;
