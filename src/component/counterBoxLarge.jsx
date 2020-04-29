import React from 'react';

const counterBoxLarge = (props) => {
  return (
    <div className="counter-lg-box">
      <div className="counter-lg-value">
        {props.confirmed.value}
      </div>
      <div className="counter-lg-label text-warning">
        Confirmed
      </div>
    </div>
  )
}

export default counterBoxLarge;
