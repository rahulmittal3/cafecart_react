import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const AdminList = () => {
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
    >
      <SubMenu key="sub1" icon={<MailOutlined />} title="Admin Content">
        <Menu.Item key="1">HomePage</Menu.Item>
        <Menu.Item key="2">Product</Menu.Item>
        <Menu.Item key="3" onClick={(e) => navigate("/admin/blogs")}>
          Blog
        </Menu.Item>
        <Menu.Item key="4" onClick={(e) => navigate("/admin/coupons")}>
          Coupon
        </Menu.Item>
        <Menu.Item key="5">Shipping Charge</Menu.Item>
        <Menu.Item key="6">Category</Menu.Item>
        <Menu.Item
          key="7"
          onClick={(e) => navigate("/admin/subcategory-parent")}
        >
          Sub Category Parent
        </Menu.Item>
        <Menu.Item
          key="8"
          onClick={(e) => navigate("/admin/subcategory-children")}
        >
          Sub Category Child
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub2" icon={<SettingOutlined />} title="Users">
        <Menu.Item key="9" onClick={(e) => navigate("/admin/users")}>
          Users
        </Menu.Item>
        <Menu.Item key="10">Orders</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default AdminList;
