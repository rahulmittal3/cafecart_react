import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import {
  Form,
  Input,
  Button,
  Checkbox,
  InputNumber,
  Switch,
  Select,
} from "antd";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getAllCategories,
  getAllSubChildren,
  createProduct,
  getAllSubParent,
} from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
const { Option } = Select;
const CreateProduct = () => {
  const [data, setData] = React.useState({
    imagePath: [],
    available: true,
    otherProducts: [],
    recommendedProducts: [],
    variants: [],
    Subcategories: [],
  });
  const [categories, setCategories] = React.useState([]);
  const [subParent, setSubParent] = React.useState([]);
  const [subChild, setSubChild] = React.useState([]);
  const [images, setImages] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [temp, setTemp] = React.useState({ ChildSubcategory: [] });
  const navigate = useNavigate();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }

  const getData = () => {
    getAllCategories(token)
      .then((res) => {
        setCategories(res.data);
        getAllSubChildren(token)
          .then((res) => {
            setSubChild(res.data);
            getAllSubParent(token)
              .then((res) => setSubParent(res.data))
              .catch((err) => toast.error(err.response.data));
          })
          .catch((err) => toast.error(err.response.data));
      })
      .catch((err) => toast.error(err.response.data));
  };
  React.useEffect(() => {
    getData();
  }, []);
  const assignMain = (id) => {
    console.log(id);
    const x = subParent.filter((curr) => curr._id === id);
    console.log(x[0].title);
    return x[0].title;
  };
  const assignMainSecond = (idArray) => {
    console.log(idArray);
    console.log(subChild);
    let t = [];
    for (let i = 0; i < subChild.length; i++) {
      for (let j = 0; j < idArray.length; j++) {
        if (i._id === idArray[j]) {
          t.push(i.title);
        }
      }
    }
    console.log(t);
    return t;
  };

  const finalSubmit = (e) => {
    e.preventDefault();
    const obj = { ...data, description: description };
    console.log(obj);
    createProduct(token, obj)
      .then((res) => {
        toast.success("Product Created!");
        navigate("/admin/products");
      })
      .catch((err) => {
        toast.error("Product Creation FAILED!");
        navigate("/admin/products");
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
            <div className={styles.couponLeft}>Create Product</div>
          </div>
          <div>
            <div>
              <label>Title</label>
              <Input
                placeholder="Enter Title"
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
                value={data.title}
                style={{ width: "80%", marginRight: "20px" }}
                className={styles.editinput}
              />
              <div>
                <label>Product Code</label>
                <Input
                  placeholder="Enter Product Code"
                  onChange={(e) => {
                    setData({ ...data, productCode: e.target.value });
                  }}
                  value={data.productCode}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>Image Path</label>
                {data &&
                  data.imagePath.map((curr, index) => {
                    return (
                      <div key={index}>
                        {" "}
                        <Input
                          style={{ width: "80%", marginRight: "20px" }}
                          value={curr}
                          className={styles.editinput}
                        />
                        <CancelIcon
                          sx={{ fontSize: 30 }}
                          onClick={(e) => {
                            const l = data.imagePath.filter(
                              (word) => word !== curr
                            );
                            setData({ ...data, imagePath: l });
                          }}
                        />
                      </div>
                    );
                  })}
                <div className={styles.addInput}>
                  <input
                    type="text"
                    onChange={(e) => setImages(e.target.value)}
                    className={styles.editinput}
                    placeholder="Add Content"
                    value={images}
                  />
                  <button
                    onClick={(e) => {
                      const x = data.imagePath;
                      x.push(images);
                      setData({ ...data, imagePath: x });
                      setImages("");
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <label>Short Description</label>
                <Input
                  placeholder="Enter Short Description"
                  onChange={(e) => {
                    setData({ ...data, short_description: e.target.value });
                  }}
                  value={data.short_description}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>Description</label>

                <ReactQuill
                  placeholder="Enter Description"
                  style={{ width: "80%", marginRight: "20px" }}
                  value={description}
                  onChange={setDescription}
                />
              </div>
              <div>
                <label>Description 1</label>
                <Input
                  placeholder="Enter Description 1"
                  onChange={(e) => {
                    setData({ ...data, description_use_first: e.target.value });
                  }}
                  value={data.description_use_first}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>Description 2</label>
                <Input
                  placeholder="Enter Description 2"
                  onChange={(e) => {
                    setData({
                      ...data,
                      description_use_second: e.target.value,
                    });
                  }}
                  value={data.description_use_second}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>Description 3</label>
                <Input
                  placeholder="Enter Description 3"
                  onChange={(e) => {
                    setData({
                      ...data,
                      description_use_third: e.target.value,
                    });
                  }}
                  value={data.description_use_third}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>Specific Type</label>
                <Input
                  placeholder="Enter Specific Type"
                  onChange={(e) => {
                    setData({
                      ...data,
                      specific_type: e.target.value,
                    });
                  }}
                  value={data.specific_type}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>Specific Ingredients</label>
                <Input
                  placeholder="Enter Specific Ingredients"
                  onChange={(e) => {
                    setData({
                      ...data,
                      specific_ingredients: e.target.value,
                    });
                  }}
                  value={data.specific_ingredients}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>Specific Date</label>
                <input
                  placeholder="Enter Specific Date"
                  onChange={(e) => {
                    setData({
                      ...data,
                      specific_date: e.target.value,
                    });
                  }}
                  value={data.specific_date}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                  type="date"
                />
              </div>
              <div>
                <label>Specific Expiry Date</label>
                <input
                  placeholder="Enter Specific Expiry Date"
                  onChange={(e) => {
                    setData({
                      ...data,
                      specific_expiry_date: e.target.value,
                    });
                  }}
                  value={data.specific_expiry_date}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                  type="date"
                />
              </div>
              <div>
                <label>Specific Quantity</label>
                <Input
                  placeholder="Enter Specific Quantity"
                  onChange={(e) => {
                    setData({
                      ...data,
                      specific_quantity: e.target.value,
                    });
                  }}
                  value={data.specific_quantity}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>MRP</label>
                <Input
                  placeholder="Enter MRP"
                  onChange={(e) => {
                    setData({
                      ...data,
                      mrpPrice: e.target.value,
                    });
                  }}
                  value={data.mrpPrice}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>Price</label>
                <Input
                  placeholder="Enter Price"
                  onChange={(e) => {
                    setData({
                      ...data,
                      price: e.target.value,
                    });
                  }}
                  value={data.price}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>CODPrepaid</label>
                <Input
                  placeholder="Enter CODPrepaid"
                  onChange={(e) => {
                    setData({
                      ...data,
                      codprepaid: e.target.value,
                    });
                  }}
                  value={data.codprepaid}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>Manufacturer</label>
                <Input
                  placeholder="Enter Manufacturer"
                  onChange={(e) => {
                    setData({
                      ...data,
                      manufacturer: e.target.value,
                    });
                  }}
                  value={data.Manufacturer}
                  style={{ width: "80%", marginRight: "20px" }}
                  className={styles.editinput}
                />
              </div>
              <div>
                <label>Available</label>
                <Switch
                  defaultChecked
                  onChange={(e) =>
                    setData({ ...data, available: !data.available })
                  }
                />
              </div>
              <div>
                <label>Other Products</label>
                {data &&
                  data.otherProducts.map((curr, index) => {
                    return (
                      <div key={index}>
                        {" "}
                        <Input
                          style={{ width: "80%", marginRight: "20px" }}
                          value={curr}
                          className={styles.editinput}
                        />
                        <CancelIcon
                          sx={{ fontSize: 30 }}
                          onClick={(e) => {
                            const l = data.otherProducts.filter(
                              (word) => word !== curr
                            );
                            setData({ ...data, otherProducts: l });
                          }}
                        />
                      </div>
                    );
                  })}
                <div className={styles.addInput}>
                  <input
                    type="text"
                    onChange={(e) => setImages(e.target.value)}
                    className={styles.editinput}
                    placeholder="Add Product Code"
                    value={images}
                  />
                  <button
                    onClick={(e) => {
                      const x = data.otherProducts;
                      x.push(images);
                      setData({ ...data, otherProducts: x });
                      setImages("");
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <label>Recommended Products</label>
                {data &&
                  data.recommendedProducts.map((curr, index) => {
                    return (
                      <div key={index}>
                        {" "}
                        <Input
                          style={{ width: "80%", marginRight: "20px" }}
                          value={curr}
                          className={styles.editinput}
                        />
                        <CancelIcon
                          sx={{ fontSize: 30 }}
                          onClick={(e) => {
                            const l = data.recommendedProducts.filter(
                              (word) => word !== curr
                            );
                            setData({ ...data, recommendedProducts: l });
                          }}
                        />
                      </div>
                    );
                  })}
                <div className={styles.addInput}>
                  <input
                    type="text"
                    onChange={(e) => setImages(e.target.value)}
                    className={styles.editinput}
                    placeholder="Add Product Code"
                    value={images}
                  />
                  <button
                    onClick={(e) => {
                      const x = data.recommendedProducts;
                      x.push(images);
                      setData({ ...data, recommendedProducts: x });
                      setImages("");
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <label>Variants</label>
                {data &&
                  data.variants.map((curr, index) => {
                    return (
                      <div key={index}>
                        {" "}
                        <Input
                          style={{ width: "80%", marginRight: "20px" }}
                          value={curr}
                          className={styles.editinput}
                        />
                        <CancelIcon
                          sx={{ fontSize: 30 }}
                          onClick={(e) => {
                            const l = data.variants.filter(
                              (word) => word !== curr
                            );
                            setData({ ...data, variants: l });
                          }}
                        />
                      </div>
                    );
                  })}
                <div className={styles.addInput}>
                  <input
                    type="text"
                    onChange={(e) => setImages(e.target.value)}
                    className={styles.editinput}
                    placeholder="Add Product Code"
                    value={images}
                  />
                  <button
                    onClick={(e) => {
                      const x = data.variants;
                      x.push(images);
                      setData({ ...data, variants: x });
                      setImages("");
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <label>Main Category</label>
                <Select
                  style={{ width: "80%" }}
                  onChange={(value) =>
                    setData({ ...data, MainCategory: value })
                  }
                >
                  {categories &&
                    categories.map((curr, index) => {
                      return (
                        <Option key={index} value={curr._id}>
                          {curr.title}
                        </Option>
                      );
                    })}
                </Select>
              </div>
              {/*-----------------------------------------------------------------------------------*/}
              <div>
                <label>Choose Category</label>
                {data &&
                  data.Subcategories.map((curr, index) => {
                    return (
                      <div key={index}>
                        {" "}
                        <Select
                          style={{
                            width: "100% !important",
                            marginRight: "50px",
                          }}
                          onChange={(value) =>
                            setTemp({ ...temp, ParentSubcategory: value })
                          }
                          defaultValue={assignMain(curr.ParentSubcategory)}
                        >
                          {subParent &&
                            subParent.map((curr, index) => {
                              return (
                                <Option key={index} value={curr._id}>
                                  {curr.title}
                                </Option>
                              );
                            })}
                        </Select>
                        <Select
                          mode="multiple"
                          style={{
                            paddingRight: "50px",
                            width: "60vw !important",
                          }}
                          placeholder="select one subChild"
                          onChange={(e) => {
                            let x = temp.ChildSubcategory;

                            console.log(x);
                            setTemp({ ...temp, ChildSubcategory: e });
                          }}
                          defaultValue={curr.ChildSubcategory}
                        >
                          {subChild &&
                            subChild.map((curr, index) => {
                              return (
                                <Option
                                  value={curr._id}
                                  label={curr}
                                  key={index}
                                >
                                  <div className="demo-option-label-item">
                                    {curr.title}
                                  </div>
                                </Option>
                              );
                            })}
                        </Select>
                        <CancelIcon
                          sx={{ fontSize: 30 }}
                          onClick={(e) => {
                            data.Subcategories.splice(index, 1);
                            setData({
                              ...data,
                              Subcategories: data.Subcategories,
                            });
                          }}
                        />
                      </div>
                    );
                  })}
                <div className={styles.addInput}>
                  <div>
                    <Select
                      style={{ width: "100% !important", marginRight: "50px" }}
                      onChange={(value) =>
                        setTemp({ ...temp, ParentSubcategory: value })
                      }
                    >
                      {subParent &&
                        subParent.map((curr, index) => {
                          return (
                            <Option key={index} value={curr._id}>
                              {curr.title}
                            </Option>
                          );
                        })}
                    </Select>
                  </div>

                  <br />
                  <br />
                  <div>
                    <Select
                      mode="multiple"
                      style={{ paddingRight: "50px", width: "60vw !important" }}
                      placeholder="select one subChild"
                      onChange={(e) => {
                        let x = temp.ChildSubcategory;

                        console.log(x);
                        setTemp({ ...temp, ChildSubcategory: e });
                      }}
                    >
                      {subChild &&
                        subChild.map((curr, index) => {
                          return (
                            <Option value={curr._id} label={curr} key={index}>
                              <div className="demo-option-label-item">
                                {curr.title}
                              </div>
                            </Option>
                          );
                        })}
                    </Select>
                  </div>
                  <br />
                  <button
                    style={{ marginLeft: "50px" }}
                    onClick={(e) => {
                      console.log(temp);
                      let m = data.Subcategories;
                      m.push(temp);
                      setData({ ...data, Subcategories: m });
                      setTemp({ ChildSubcategory: [] });
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>{" "}
            <button onClick={finalSubmit}>Hello</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateProduct;
