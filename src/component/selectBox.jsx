import React, { Fragment } from 'react';

const selectBox = (props) => {
  return (
    <Fragment>
      <select className="select-box" name="countryCode" id="countryCode" onChange={e => props.handleOnChange(e.target.value)} value={props.countryCode}>
        {
          props.countryList.map((country, index) => 
            <option value={country.alpha2Code} key={country.alpha2Code}>
              {country.name}
            </option>
          )
        }
      </select>
      <small className="help-text">Click To Change Country</small>
    </Fragment>
  )
}

export default selectBox;
