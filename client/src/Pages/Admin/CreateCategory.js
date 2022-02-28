import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import {
  createSubParent,
  getAllSubParent,
  getAllSubChildren,
  createCategory,
} from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
const CreateCategory = () => {
  const [data, setData] = React.useState({});
  const navigate = useNavigate();
  const [parent, setParent] = React.useState([]);
  const [children, setChildren] = React.useState([]);
  const [CP, setCP] = React.useState("");
  const [CC, setCC] = React.useState("");
  const [obj, setObj] = React.useState({});
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }

  const getParent = () => {
    getAllSubParent(token)
      .then((res) => setParent(res.data))
      .catch((err) => {
        toast.error("Parent could not be fetched!");
        navigate("/admin/category");
      });
  };
  React.useEffect(() => {
    getParent();
  }, []);
  const getChildren = () => {
    getAllSubChildren(token)
      .then((res) => setChildren(res.data))
      .catch((err) => {
        toast.error("Parent could not be fetched!");
        navigate("/admin/category");
      });
  };
  React.useEffect(() => {
    getChildren();
  }, []);

  //-------------------------form handling----------------
  function handleChange(value) {
    console.log(value, typeof value);
    // const x = value.split(",");
    setObj({ ...obj, Child_Subcategory: value });
  }
  const onGenderChange = (x) => {
    setObj({ ...obj, Parent_Subcategory: x });
  };
  console.log(obj);
  const handleClick = () => {
    const x = data?.subcategories ? data.subcategories : [];
    console.log(x);
    x.push(obj);
    console.log(x);
    setData({ ...data, subcategories: x });
    setObj({});
  };
  const deleteParent = () => {};
  const onFinish = (values) => {
    handleClick();
    createCategory(token, data)
      .then((res) => {
        toast.success("Category has been created Successfully");
        navigate("/admin/category");
      })
      .catch((err) => {
        toast.error("Category could not been created Successfully");
        navigate("/admin/category");
      });
  };
  return (
    <div className={styles.overall}>
      <div className={styles.left}>
        <AdminList />
      </div>
      <div className={styles.right}>
        <div className={styles.rightInner}>
          <div className={styles.couponHeading}>
            <div className={styles.couponLeft}>Create Category</div>
          </div>

          <Form
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your category title!",
                },
              ]}
            >
              <Input
                style={{ width: "60%" }}
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
                value={data?.title ? data.title : ""}
              />
            </Form.Item>

            <Form.List
              name="names"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 0) {
                      return Promise.reject(new Error("At least 2 passengers"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <>
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "Gender" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Select
                          style={{ width: "60%" }}
                          placeholder="Choose a Parent Category"
                          onChange={onGenderChange}
                          allowClear
                        >
                          {parent &&
                            parent.map((curr, index) => {
                              return (
                                <Select.Option value={curr._id} key={curr._id}>
                                  {curr.title}
                                </Select.Option>
                              );
                            })}
                        </Select>
                        {/* </Form.Item> */}
                        {fields.length > 0 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={deleteParent}
                          />
                        ) : null}
                      </Form.Item>
                      <Select
                        mode="multiple"
                        style={{ marginLeft: "200px", width: "60%" }}
                        placeholder="select one country"
                        // defaultValue={["china"]}
                        onChange={handleChange}
                        optionLabelProp="label"
                      >
                        {children &&
                          children.map((curr, index) => {
                            return (
                              <Option
                                value={curr._id}
                                label={curr.title}
                                key={curr._id}
                              >
                                <div className="demo-option-label-item">
                                  {curr.title}
                                </div>
                              </Option>
                            );
                          })}
                      </Select>
                      <br /> <br /> <br /> <br />
                    </>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        //1st add the existing item to data stateClass
                        handleClick();
                        add();
                      }}
                      style={{ width: "60%" }}
                      icon={<PlusOutlined />}
                    >
                      Add Parent Category
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
