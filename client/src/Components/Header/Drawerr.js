import React from "react";
import { Drawer, Button, Radio, Space, Menu, Switch } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const { SubMenu } = Menu;
const Drawerr = ({
  visible,
  setVisible,
  headers,
  user,
  logoutHandler,
  openModal,
}) => {
  const navigate = useNavigate();
  const onClose = () => {
    setVisible(false);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const [current, setCurrent] = React.useState("1");
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <Drawer
        width={304}
        title={
          user ? (
            `Welcome Back, ${user.name.split(" ")[0]}`
          ) : (
            <h4 onClick={openModal}>LOGIN / SIGNUP</h4>
          )
        }
        placement={"left"}
        closable={true}
        onClose={onClose}
        visible={visible}
        key={"coffee"}
      >
        <Menu
          onClick={handleClick}
          style={{ width: 256, padding: "0px" }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={current}
          mode="inline"
          className={styles.removePadding}
          //submenu->item
        >
          {user && (
            <Menu.Item>
              <Link to="/user/profile">Profile</Link>
            </Menu.Item>
          )}
          {headers &&
            headers.map((curr, index) => {
              return (
                <SubMenu key={curr.slug} title={curr.title}>
                  {curr.Subcategories &&
                    curr.Subcategories.map((second, index) => {
                      return (
                        <SubMenu
                          key={second.slug}
                          title={second.Parent_Subcategory.title}
                        >
                          {second.Child_Subcategory.length > 0 &&
                            second.Child_Subcategory.map((third, index) => {
                              return (
                                <Menu.Item key={third.slug}>
                                  <Link
                                    to={`/products/category/${curr.slug}/${second.Parent_Subcategory.slug}/${third.slug}`}
                                  >
                                    {third.title}
                                  </Link>
                                </Menu.Item>
                              );
                            })}
                        </SubMenu>
                      );
                    })}
                </SubMenu>
              );
            })}
          <Menu.Item>
            <Link to="/blog">Blogs</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/about-us">About Us</Link>
          </Menu.Item>
          {user && <Menu.Item onClick={logoutHandler}>Logout</Menu.Item>}
        </Menu>
      </Drawer>
    </>
  );
};

export default Drawerr;
