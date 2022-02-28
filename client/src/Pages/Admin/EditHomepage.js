import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { updateHomepage, getHomepage } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
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

const EditHomepage = () => {
  const [data, setData] = React.useState({});
  const navigate = useNavigate();
  const [images, setImages] = React.useState("");
  const params = useParams();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getHomepage(token, params.id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);
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
    updateHomepage(token, data)
      .then((res) => {
        toast.success("Homepage Content Modified!");
        navigate(`/admin/home-page/${params.id}`);
      })
      .catch((err) => {
        toast.error(err.response.data);
        navigate(`/admin/home-page/${params.id}`);
      });
  };
  const deleteMine = (key, value) => {
    if (key === "bannerImages") {
      const l = data.bannerImages;
      if (!l) {
        //it doesnot exist
        const x = [];
        x.push(images);
        setData({ ...data, bannerImages: x });
      } else {
        //it exists here
        let m = l.filter((word) => word !== value);
        setData({ ...data, bannerImages: m });
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
        let m = l.filter((word) => word !== value);
        setData({ ...data, bestInBruh: m });
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
        let m = l.filter((word) => word !== value);
        setData({ ...data, trending: m });
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
        let m = l.filter((word) => word !== value);
        setData({ ...data, newArrivals: m });
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
        let m = l.filter((word) => word !== value);
        setData({ ...data, youMayLike: m });
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
        let m = l.filter((word) => word !== value);
        setData({ ...data, brands: m });
      }
    }
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
              Edit Homepage
              <br />{" "}
            </div>
          </div>
          <div>
            <div className={styles.contentHead}>Homepage Id</div>
            <div>{data?._id}</div>
          </div>
          <div>
            <div className={styles.contentHead}>Brand Images</div>
            <div>
              {data.bannerImages &&
                data.bannerImages.map((curr, index) => {
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
                        onClick={(e) => deleteMine("bannerImages", curr)}
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
                />
                <button onClick={(e) => setItem("bannerImages", images)}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.contentHead}>New Arrivals</div>
            <div>
              {data.newArrivals &&
                data.newArrivals.map((curr, index) => {
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
                        onClick={(e) => deleteMine("newArrivals", curr)}
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
                />
                <button onClick={(e) => setItem("newArrivals", images)}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.contentHead}>Trending</div>
            <div>
              {data.trending &&
                data.trending.map((curr, index) => {
                  return (
                    <div key={index}>
                      {" "}
                      <Input
                        style={{ width: "80%", marginRight: "20px" }}
                        value={curr}
                        className={styles.editinput}
                        placeholder="Add Content"
                      />
                      <CancelIcon
                        sx={{ fontSize: 30 }}
                        onClick={(e) => deleteMine("trending", curr)}
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
                />
                <button onClick={(e) => setItem("trending", images)}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.contentHead}>You May Like</div>
            <div>
              {data.youMayLike &&
                data.youMayLike.map((curr, index) => {
                  return (
                    <div key={index}>
                      {" "}
                      <Input
                        style={{ width: "80%", marginRight: "20px" }}
                        value={curr}
                        className={styles.editinput}
                        placeholder="Add Content"
                      />
                      <CancelIcon
                        sx={{ fontSize: 30 }}
                        onClick={(e) => deleteMine("youMayLike", curr)}
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
                />
                <button onClick={(e) => setItem("youMayLike", images)}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.contentHead}>Best In Cafecart</div>
            <div>
              {data.bestInBruh &&
                data.bestInBruh.map((curr, index) => {
                  return (
                    <div key={index}>
                      {" "}
                      <Input
                        style={{ width: "80%", marginRight: "20px" }}
                        value={curr}
                        className={styles.editinput}
                        placeholder="Add Content"
                      />
                      <CancelIcon
                        sx={{ fontSize: 30 }}
                        onClick={(e) => deleteMine("bestInBruh", curr)}
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
                />
                <button onClick={(e) => setItem("bestInBruh", images)}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.contentHead}>Brands</div>
            <div>
              {data.brands &&
                data.brands.map((curr, index) => {
                  return (
                    <div key={index}>
                      {" "}
                      <Input
                        style={{ width: "80%", marginRight: "20px" }}
                        value={curr}
                        className={styles.editinput}
                        placeholder="Add Content"
                      />
                      <CancelIcon
                        sx={{ fontSize: 30 }}
                        onClick={(e) => deleteMine("brands", curr)}
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
                />
                <button onClick={(e) => setItem("brands", images)}>Add</button>
              </div>{" "}
            </div>
            <div className={styles.editBtn} onClick={handleSubmit}>
              Save Changes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHomepage;
