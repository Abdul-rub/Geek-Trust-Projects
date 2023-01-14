import React from "react";
import  "../styles/Filter.css";

function Filter() {
  return (
    <div className="filter_box">
      <div className="input_checkbox_box">
        <p>Colour</p>
        <input type="checkbox" /> <label for="red">Red</label>
        <br />
        <input type="checkbox" /> <label for="blue">Blue</label>
        <br />
        <input type="checkbox" /> <label for="green">Green</label>
        <br />
      </div>
      <div className="input_checkbox_box">
        <p>Gender</p>
        <input type="checkbox" /> <label for="men">Men</label>
        <br />
        <input type="checkbox" /> <label for="women">Women</label>
        <br />
      </div>
      <div className="input_checkbox_box">
        <p>Price</p>
        <input type="checkbox" /> <label for="">0-Rs250</label>
        <br />
        <input type="checkbox" /> <label for="">Rs251-450</label>
        <br />
        <input type="checkbox" /> <label for="">Rs 450</label>
        <br />
      </div>
      <div className="input_checkbox_box">
        <p>Type</p>
        <input type="checkbox" /> <label for="polo">Polo</label>
        <br />
        <input type="checkbox" /> <label for="hoodie">Hoodie</label>
        <br />
        <input type="checkbox" /> <label for="basic">Basic</label>
        <br />
      </div>
    </div>
  );
}

export default Filter;
