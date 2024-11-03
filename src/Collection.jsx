import { useState } from "react";

export default function Collection({ name, images }) {
  const [select, setSelect] = useState(images[0]);
  return (
    <div className="collection">
      <img className="collection__big imgBig" src={select} alt="Item" />
      <div className="collection__bottom">
        <img
          onClick={() => setSelect(images[1])}
          className={`collection__mini ${select === images[1] ? "imgMini" : ""}`}
          src={images[1]}
          alt="Item"
        />
        <img
          onClick={() => setSelect(images[0])}
          className={`collection__mini ${select === images[0] ? "imgMini" : ""}`}
          src={images[0]}
          alt="Item"
        />
        <img
          onClick={() => setSelect(images[2])}
          className={`collection__mini ${select === images[2] ? "imgMini" : ""}`}
          src={images[2]}
          alt="Item"
        />
      </div>
      <h4>{name}</h4>
    </div>
  );
}
