<div className={styles.outer}>
  <center>
    <Slider {...settings}>
      <div>
        <img
          src="https://wallpaperaccess.com/full/1076692.jpg"
          alt="slick"
          //style={{ width: "80vw", height: "100%" }}
          //
          className={styles.banner}
        />
      </div>
      <div>
        <img
          src="https://files.wallpaperpass.com/2019/10/coffee%20wallpaper%20052%20-%202880x1800-768x480.jpeg"
          alt="slick"
          //style={{ width: "80vw", height: "100%" }}
          className={styles.banner}
        />
      </div>
      <div>
        <img
          src="https://www.wallpaperup.com/uploads/wallpapers/2013/11/09/171722/63511993de344e27beb1880b7a9810fd-1000.jpg"
          alt="slick"
          //style={{ width: "80vw", height: "100%" }}
          className={styles.banner}
        />
      </div>

      {/* <div>
      <img
        src="https://wallpaperaccess.com/full/1076741.jpg"
        alt="slick"
        style={{ width: "80vw", height: "100%" }}
        className={styles.banner}
      />
    </div> */}
    </Slider>
  </center>
  <div style={{ textAlign: "left", marginTop: "20px" }}>
    <p className={styles.BlogTitle}>Latest Blogs</p>
  </div>
  <div className={styles.heading}>
    <div className={styles.wrapper}>
      <div className={styles.left}>
        {blogs &&
          blogs.map((curr, index) => {
            return (
              <div key={index} className={styles.card}>
                <div className={styles.card__picture}>
                  <img
                    src={curr.imagePath}
                    alt={curr.title}
                    className={styles.card__picture__img}
                  />
                </div>
                <div className={styles.card__meta}>
                  <div className={styles.card__meta__title}>{curr.title}</div>
                  <div className={styles.categoriesWrap}>
                    <div
                      className={styles.card__meta__category}
                      style={{ backgroundColor: getColor() }}
                    >
                      {curr.blog_category}
                    </div>
                  </div>
                  <div className={styles.card__meta__preview}>
                    {curr?.preview.substring(0, 55)}..!
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.right}>
        <center>
          <div className={styles.right__search}>
            <input
              type="text"
              className={styles.right__search__input}
              placeholder={"Search for Categories & Blogs.."}
            />
            <button className={styles.right__search__inputBtn}>Search</button>
          </div>
          <div>
            <div className={styles.right__info__outer}>
              <div className={styles.right__info__outer__title}>Cafecart</div>
              <div className={styles.right__info__outer__desc}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Exercitationem facilis sunt repellendus excepturi beatae porro
                debitis voluptate nulla quo veniam fuga sit molestias minus.
              </div>
              <button className={styles.right__aboutUsBtn}>About Us</button>
              <div className={styles.right__outerBtns}>
                <div style={{ margin: "5px" }} className={styles.right__icons}>
                  <FacebookIcon style={{ fontSize: "32px" }} />
                </div>
                <div style={{ margin: "5px" }} className={styles.right__icons}>
                  <PinterestIcon style={{ fontSize: "32px" }} />
                </div>
                <div style={{ margin: "5px" }} className={styles.right__icons}>
                  <InstagramIcon style={{ fontSize: "32px" }} />
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    </div>
  </div>
</div>;
