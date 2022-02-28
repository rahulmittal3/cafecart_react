import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { createHomepage } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
const CreateHomepage = () => {
  const [data, setData] = React.useState({});
  const navigate = useNavigate();
  const [images, setImages] = React.useState("");
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const setItem = (key, value) => {
    //get the array from the data, and if not present, create One from the
    if (value === "") {
      return;
    }
    console.log(key);
    if (key === "bannerImages") {
      const l = data.bannerImages;
      if (!l) {
        //it doesnot exist
        const x = [];
        x.push(images);
        setData({ ...data, bannerImages: x });
      } else {
        //it exists here
        l.push(images);
        setData({ ...data, bannerImages: l });
      }
    } else if (key === "bestInBruh") {
      const l = data.bestInBruh;
      if (!l) {
        //it doesnot exist
        const x = [];
        x.push(images);
        setData({ ...data, bestInBruh: x });
      } else {
        //it exists here
        l.push(images);
        setData({ ...data, bestInBruh: l });
      }
    } else if (key === "trending") {
      const l = data.trending;
      if (!l) {
        //it doesnot exist
        const x = [];
        x.push(images);
        setData({ ...data, trending: x });
      } else {
        //it exists here
        l.push(images);
        setData({ ...data, trending: l });
      }
    } else if (key === "newArrivals") {
      const l = data.newArrivals;
      if (!l) {
        //it doesnot exist
        const x = [];
        x.push(images);
        setData({ ...data, newArrivals: x });
      } else {
        //it exists here
        l.push(images);
        setData({ ...data, newArrivals: l });
      }
    } else if (key === "youMayLike") {
      const l = data.youMayLike;
      if (!l) {
        //it doesnot exist
        const x = [];
        x.push(images);
        setData({ ...data, youMayLike: x });
      } else {
        //it exists here
        l.push(images);
        setData({ ...data, youMayLike: l });
      }
    } else if (key === "brands") {
      const l = data.brands;
      if (!l) {
        //it doesnot exist
        const x = [];
        x.push(images);
        setData({ ...data, brands: x });
      } else {
        //it exists here
        l.push(images);
        setData({ ...data, brands: l });
      }
    }

    setImages("");
  };
  console.log(data);
  const handleSubmit = () => {
    if (!data.youMayLike) {
      toast.error("Please select atleast 1 You May Like Item");
      return;
    }
    if (!data.newArrivals) {
      toast.error("Please select atleast 1 New Arrival Item");
      return;
    }
    if (!data.trending) {
      toast.error("Please select atleast 1 Trending Item");
      return;
    }
    if (!data.brands) {
      toast.error("Please select atleast 1 Brand Item");
      return;
    }
    if (!data.bestInBruh) {
      toast.error("Please select atleast 1 Best In Cafecart Item");
      return;
    }
    if (!data.bannerImages) {
      toast.error("Please select atleast 1 Bannner Image Item");
      return;
    }
    console.log(data);
    createHomepage(token, data)
      .then((res) => {
        toast.success("Homepage Content Created!");
        navigate("/admin/home-page");
      })
      .catch((err) => {
        toast.error(err.response.data);
        navigate("/admin/home-page");
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
            <div className={styles.couponLeft}>
              Create Homepage
              <br />{" "}
            </div>
          </div>
          <div>
            <p>
              Banner Images{" "}
              <span style={{ fontSize: "10px" }}>
                &emsp;(After Entering Data, Click on <b>+ Add Button</b> to
                Save)
              </span>
            </p>
            <Form
              name="dynamic_form_item"
              {...formItemLayoutWithOutLabel}
              // onFinish={onFinish}
            >
              <Form.List
                name="names"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(
                          new Error("At least 1 Item is Required!")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "Banner Images" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Banner Images or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Banner Image Link"
                            style={{ width: "60%" }}
                            onChange={(e) => setImages(e.target.value)}
                          />
                        </Form.Item>
                        {fields.length > 0 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          //1st permanently add it to the data objects
                          setItem("bannerImages", images);
                          add();
                        }}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add Banner Image
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
          {/* aahaha */}
          <div>
            <p>
              New Arrivals
              <span style={{ fontSize: "10px" }}>
                &emsp;(After Entering Data, Click on <b>+ Add Button</b> to
                Save)
              </span>
            </p>
            <Form
              name="dynamic_form_item"
              {...formItemLayoutWithOutLabel}
              // onFinish={onFinish}
            >
              <Form.List
                name="names"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(
                          new Error("At least 1 Item is Required!")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "New Arrivals" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input New Arrivals or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="New Arrivals"
                            style={{ width: "60%" }}
                            onChange={(e) => setImages(e.target.value)}
                          />
                        </Form.Item>
                        {fields.length > 0 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          setItem("newArrivals", images);
                        }}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add New Arrivals
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
          {/* aahaha */}
          <div>
            <p>
              You May Like
              <span style={{ fontSize: "10px" }}>
                &emsp;(After Entering Data, Click on <b>+ Add Button</b> to
                Save)
              </span>
            </p>
            <Form
              name="dynamic_form_item"
              {...formItemLayoutWithOutLabel}
              // onFinish={onFinish}
            >
              <Form.List
                name="names"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(
                          new Error("At least 1 Item is Required!")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "You May Like" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input You May Like or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="You May Like"
                            style={{ width: "60%" }}
                            onChange={(e) => setImages(e.target.value)}
                          />
                        </Form.Item>
                        {fields.length > 0 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          setItem("youMayLike", images);
                        }}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add You May Like
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
          {/* aahaha */}
          <div>
            <p>
              Best in Cafecart
              <span style={{ fontSize: "10px" }}>
                &emsp;(After Entering Data, Click on <b>+ Add Button</b> to
                Save)
              </span>
            </p>
            <Form
              name="dynamic_form_item"
              {...formItemLayoutWithOutLabel}
              // onFinish={onFinish}
            >
              <Form.List
                name="names"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(
                          new Error("At least 1 Item is Required!")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "Best in Cafecart" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Best in Cafecart or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Best in Cafecart"
                            style={{ width: "60%" }}
                            onChange={(e) => setImages(e.target.value)}
                          />
                        </Form.Item>
                        {fields.length > 0 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          setItem("bestInBruh", images);
                          add();
                        }}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Best in Cafecart
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
          {/* aahaha */}
          <div>
            <p>
              Trending
              <span style={{ fontSize: "10px" }}>
                &emsp;(After Entering Data, Click on <b>+ Add Button</b> to
                Save)
              </span>
            </p>
            <Form
              name="dynamic_form_item"
              {...formItemLayoutWithOutLabel}
              // onFinish={onFinish}
            >
              <Form.List
                name="names"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(
                          new Error("At least 1 Item is Required!")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "Trending" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Trending name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Trending"
                            style={{ width: "60%" }}
                            onChange={(e) => setImages(e.target.value)}
                          />
                        </Form.Item>
                        {fields.length > 0 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          setItem("trending", images);
                          add();
                        }}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add Trending
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
          {/* aahaha */}
          <div>
            <p>
              Brands
              <span style={{ fontSize: "10px" }}>
                &emsp;(After Entering Data, Click on <b>+ Add Button</b> to
                Save)
              </span>
            </p>
            <Form
              name="dynamic_form_item"
              {...formItemLayoutWithOutLabel}
              // onFinish={onFinish}
            >
              <Form.List
                name="names"
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length < 1) {
                        return Promise.reject(
                          new Error("At least 1 Item is Required!")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "Brands" : ""}
                        required={false}
                        key={field.key}
                      >
                        <Form.Item
                          {...field}
                          validateTrigger={["onChange", "onBlur"]}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message:
                                "Please input Brands or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="Brands"
                            style={{ width: "60%" }}
                            onChange={(e) => setImages(e.target.value)}
                          />
                        </Form.Item>
                        {fields.length > 0 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                          setItem("brands", images);
                        }}
                        style={{ width: "60%" }}
                        icon={<PlusOutlined />}
                      >
                        Add Brands
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
        </div>
        <div>
          <center>
            <button
              style={{
                backgroundColor: "blue",
                marginTop: "-10px",
                marginBottom: "10px",
                borderRadius: "5px",
                padding: "15px",
                color: "white",
              }}
              onClick={handleSubmit}
            >
              Create
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default CreateHomepage;
