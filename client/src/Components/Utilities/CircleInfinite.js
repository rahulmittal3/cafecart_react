import CircularProgress from "@mui/material/CircularProgress";

import React from "react";

const CircleInfinite = ({ loading }) => {
  return (
    <>
      {loading && (
        <div>
          <div
            style={{
              height: "50vh",
            }}
          >
            <center>
              <CircularProgress color="warning" size={60} />
            </center>
          </div>
        </div>
      )}
    </>
  );
};

export default CircleInfinite;
