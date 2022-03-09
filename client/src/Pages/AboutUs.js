import styles from "./AboutUs.module.css";
import React from "react";
import ReactRoundedImage from "react-rounded-image";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { toast } from "react-toastify";
import { sendAboutUsMail } from "../Axios/Mailer.js";

const AboutUs = () => {
  const [data, setData] = React.useState({});
  const sendMessage = (e) => {
    e.preventDefault();
    sendAboutUsMail(data)
      .then((res) => toast.success(res.data))
      .catch((err) => console.log(err.response.data));
  };
  return (
    <>
      <div className={styles.overview}>
        <center>
          <div className={styles.title}>WHO WE are</div>
          <div className={styles.content}>
            Viverra a massa feugiat faucibus cursus morbi nunc. Habitant
            adipiscing posuere eu tempor semper fusce mauris. Et lobortis
            laoreet tristique ut aenean. Vestibulum suscipit imperdiet ipsum
            vitae bibendum nisi, id scelerisque habitasse. Diam condimentum
            aliquet vitae tempus, iaculis sagittis proin sit. Viverra tincidunt
            venenatis proin vitae gravida cras turpis etiam. Id imperdiet velit
            malesuada id pretium mollis ipsum aliquam. Nec, arcu, tristique eget
            elementum. Quis orci facilisis diam eget sem mauris, in amet duis.
            Risus eget justo morbi pulvinar enim amet habitasse proin. Donec in
            nisl duis pellentesque tortor gravida vitae amet sem mauris, in amet
            duis. Risus eget justo morbi pulvinar enim amet habitasse proin..
          </div>
        </center>
      </div>
      <div className={styles.lower}>
        <div className={styles.foundersAndAboutUs}>
          <div className={styles.aboutUs}>
            <div className={styles.titleAboutUs}>Our Mission</div>
            <div className={styles.contentAboutUs}>
              {" "}
              Viverra a massa feugiat faucibus cursus morbi nunc. Habitant
              adipiscing posuere eu tempor semper fusce mauris. Et lobortis
              laoreet tristique ut aenean. Vestibulum suscipit imperdiet ipsum
              vitae bibendum nisi, id scelerisque habitasse. Diam condimentum
              aliquet vitae tempus,
            </div>
          </div>
          <div className={styles.founders}>
            <div className={styles.founder}>
              <div className={styles.image}>
                {" "}
                <ReactRoundedImage
                  image={
                    "https://res.cloudinary.com/techbuy/image/upload/v1644658063/helllo_po0gga.jpg"
                  }
                  roundedColor="#fff"
                  imageWidth="120"
                  imageHeight="120"
                  roundedSize="13"
                  borderRadius="70"
                />
              </div>
              <div className={styles.position}>Aryan Makharia</div>
              <div className={styles.position}>Co-founder</div>
              <div className={styles.founder_description}>
                adipiscing posuere eu tempor semper fusce mauris. Et lobortis
                laoreet tristique ut aenean. Vestibulum suscipit imperdiet ipsum
                vitae bibendum nisi, id scelerisque habitasse. Diam condimentum
                aliquet vitae tempus
              </div>
            </div>
            <div className={styles.founder}>
              <div className={styles.image}>
                {" "}
                <ReactRoundedImage
                  image={
                    "https://res.cloudinary.com/techbuy/image/upload/v1644658063/helllo_po0gga.jpg"
                  }
                  roundedColor="#fff"
                  imageWidth="120"
                  imageHeight="120"
                  roundedSize="13"
                  borderRadius="70"
                />
              </div>
              <div className={styles.position}>Rahul Mittal</div>
              <div className={styles.position}>Co-founder</div>
              <div className={styles.founder_description}>
                adipiscing posuere eu tempor semper fusce mauris. Et lobortis
                laoreet tristique ut aenean. Vestibulum suscipit imperdiet ipsum
                vitae bibendum nisi, id scelerisque habitasse. Diam condimentum
                aliquet vitae tempus
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.card_icon}>
              {/* <ReactRoundedImage
                image={
                  "https://res.cloudinary.com/techbuy/image/upload/v1645345092/coffee_x0syd9.png"
                }
                roundedColor="#fff"
                imageWidth="120"
                imageHeight="120"
                roundedSize="13"
                borderRadius="70"
              /> */}
              <center>
                <img
                  src="https://res.cloudinary.com/techbuy/image/upload/v1645345092/coffee_x0syd9.png"
                  alt="logo"
                  className={styles.imgLogo}
                />
              </center>
            </div>
            <div className={styles.card_title}>Premium Coffee's</div>
            <div className={styles.card_desc}>
              We provide a premium range of different types of exotic coffees
              out there with the lowest prices.
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_icon}>
              <center>
                <img
                  src="https://res.cloudinary.com/techbuy/image/upload/v1645345286/like_qmthui.png"
                  alt="logo"
                  className={styles.imgLogo}
                />
              </center>
            </div>
            <div className={styles.card_title}>Best Coffee</div>
            <div className={styles.card_desc}>
              We provide a premium range of different types of exotic coffees
              out there with the lowest prices.
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_icon}>
              <center>
                <img
                  src="https://res.cloudinary.com/techbuy/image/upload/v1645345286/like_qmthui.png"
                  alt="logo"
                  className={styles.imgLogo}
                />
              </center>
            </div>
            <div className={styles.card_title}>Pay on Delivery</div>
            <div className={styles.card_desc}>
              We provide a premium range of different types of exotic coffees
              out there with the lowest prices.
            </div>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.block}>
            <div className={styles.block_title}>Contact Information</div>
            <div className={styles.block_desc}>
              Egestas purus tellus nunc fames faucibus.
            </div>
            <div className={styles.block_contact}>
              <LocalPhoneIcon sx={{ color: "white", fontSize: 25 }} />
              &emsp;+91 7015060623
            </div>
            <div className={styles.block_contact}>
              <MailIcon sx={{ color: "white", fontSize: 25 }} />
              &emsp;business.cafecart@gmail.com
            </div>
            <div className={styles.block_contact}>
              <LocationOnIcon sx={{ color: "white", fontSize: 25 }} />
              &emsp;Bulleshwar, Mumbai
            </div>
          </div>
          <div className={styles.reg}>
            <div className={styles.info}>
              <div className={styles.names}>
                <div className={styles.name1}>
                  <div className={styles.nameAsk}>First Name</div>
                  <div className={styles.nameAns}>
                    <input
                      type="text"
                      className={styles.nameInput}
                      onChange={(e) =>
                        setData({ ...data, fName: e.target.value })
                      }
                      value={data.fName}
                    />
                  </div>
                </div>
                <div className={styles.name2}>
                  <div className={styles.nameAsk}>Last Name</div>
                  <div className={styles.nameAns}>
                    <input
                      type="text"
                      className={styles.nameInput}
                      onChange={(e) =>
                        setData({ ...data, lName: e.target.value })
                      }
                      value={data.lName}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.regContact}>
                <div className={styles.name1}>
                  <div className={styles.nameAsk}>Mail</div>
                  <div className={styles.nameAns}>
                    <input
                      type="text"
                      className={styles.nameInput}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      value={data.email}
                    />
                  </div>
                </div>
                <div className={styles.name2}>
                  <div className={styles.nameAsk}>Phone</div>
                  <div className={styles.nameAns}>
                    <input
                      type="text"
                      className={styles.nameInput}
                      onChange={(e) =>
                        setData({ ...data, phone: e.target.value })
                      }
                      value={data.phone}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.infoMsg}>
              <div className={styles.nameAsk}> Message</div>
              <div className={styles.nameAns}>
                <textarea
                  className={styles.nameInput}
                  type="text"
                  style={{ color: "black", opacity: "1" }}
                  onChange={(e) =>
                    setData({ ...data, message: e.target.value })
                  }
                  value={data.message}
                />
              </div>
            </div>
            <div className={styles.btn}>
              <button
                className={styles.button}
                onClick={sendMessage}
                disabled={
                  !data.fName ||
                  !data.lName ||
                  !data.email ||
                  !data.phone ||
                  !data.message ||
                  data.email.includes("@") === false ||
                  data.message.length < 10 ||
                  data.phone.length !== 10
                }
              >
                {" "}
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
