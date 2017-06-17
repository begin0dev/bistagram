import React from 'react';

const Imgview = ({media}) => {
    return (
      <div className="imgwrap_div">
        <img src={`/upload/${media.medianame}`} className="postview_bodyimg" alt=""></img>
      </div>
    )
}

export default Imgview;
