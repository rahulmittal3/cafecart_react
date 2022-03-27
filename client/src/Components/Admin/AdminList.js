import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  ReadOutlined,
  TransactionOutlined,
  ShoppingOutlined,
  UserOutlined,
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
      <SubMenu key="sub1" icon={<ReadOutlined />} title="Blogs">
        <Menu.Item key="sub11" onClick={(e) => navigate("/admin/blogs")}>
          Blog
        </Menu.Item>
        <Menu.Item
          key="sub12"
          onClick={(e) => navigate("/admin/blogs/categories")}
        >
          Blog Category
        </Menu.Item>
        <Menu.Item key="sub13" onClick={(e) => navigate("/admin/blogs/tags")}>
          Blog Tags
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<ShoppingOutlined />} title="Products">
        <Menu.Item key="sub21" onClick={(e) => navigate("/admin/category")}>
          Category
        </Menu.Item>
        <Menu.Item key="sub22" onClick={(e) => navigate("/admin/home-page")}>
          HomePage
        </Menu.Item>
        <Menu.Item key="sub23" onClick={(e) => navigate("/admin/products")}>
          Product
        </Menu.Item>
        <Menu.Item
          key="sub24"
          onClick={(e) => navigate("/admin/subcategory-children")}
        >
          Sub Category Child
        </Menu.Item>
        <Menu.Item
          key="sub25"
          onClick={(e) => navigate("/admin/subcategory-parent")}
        >
          Sub Category Parent
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub3"
        icon={<TransactionOutlined />}
        title="Offers & Addons"
      >
        <Menu.Item key="sub31" onClick={(e) => navigate("/admin/coupons")}>
          Coupon
        </Menu.Item>
        <Menu.Item
          key="sub32"
          onClick={(e) => navigate("/admin/shipping-charges")}
        >
          Shipping Charge
        </Menu.Item>
      </SubMenu>

      <SubMenu key="sub4" icon={<UserOutlined />} title="Users">
        <Menu.Item key="sub41" onClick={(e) => navigate("/admin/orders")}>
          Orders
        </Menu.Item>
        <Menu.Item key="sub42" onClick={(e) => navigate("/admin/reviews")}>
          Reviews
        </Menu.Item>
        <Menu.Item key="sub45" onClick={(e) => navigate("/admin/users")}>
          Users
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default AdminList;
