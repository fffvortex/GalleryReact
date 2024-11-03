import React, { useEffect, useState } from "react";
import "./index.scss";
import Collection from "./Collection";

const categories = [
  { name: "Все" },
  { name: "Сочи" },
  { name: "Обыденные" },
  { name: "Города" },
];

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [collections, setCollections] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    setLoading(true);

    const category = categoryId ? `category=${categoryId}` : ``;

    fetch(`https://6727414c302d03037e70206a.mockapi.io/photos?page=${page}&limit=10&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении данных");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя любимая женщина</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading....</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection name={obj.name} images={obj.photos} key={index} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(4)].map((_, i) => (
          <li
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
