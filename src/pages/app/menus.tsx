import {
  DatabaseOutlined,
  QrcodeOutlined,
  UserAddOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import Cryptocurrency from "./cryptocurrency";
import Message from "./message";
import Repositories from "./repositories";

export const MenuArr = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <UserAddOutlined />,
    children: [
      {
        path: "/dashboard/message",
        name: "Message",
        element: <Message />,
        icon: <WechatOutlined />,
      },
    ],
  },
  {
    name: "Repositories",
    path: "/repositories",
    element: <Repositories />,
    icon: <QrcodeOutlined />,
  },
  {
    name: "Cryptocurrency",
    path: "/cryptocurrency",
    element: <Cryptocurrency />,
    icon: <DatabaseOutlined />,
  },
];

export default MenuArr;
