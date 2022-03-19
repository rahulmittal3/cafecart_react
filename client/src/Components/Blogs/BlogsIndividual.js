import React from "react";

const BlogsIndividual = ({ curr }) => {
  React.useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  console.log(curr);
  return (
    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.0s">
      <div className="blog-item">
        <div
          className="blog-img"
          style={{ width: "100%", height: 280, maxWidth: 480 }}
        >
          <img
            src={curr.imagePath}
            alt="Blog"
            style={{ width: "100%", height: "40vh", objectFit: "cover" }}
          />
        </div>
        <div className="blog-text">
          <h2>{curr.title}</h2>
          {/* <div class="blog-meta">
            <p><i class="far fa-list-alt"></i>Body Fitness</p>
            <p><i class="far fa-calendar-alt"></i>01-Jan-2045</p>
            <p><i class="far fa-comments"></i>5</p>
          </div>*/}
          <p>{curr.preview}</p>
          <a className="btn" href="/">
            Read More <i className="fa fa-angle-right" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogsIndividual;
