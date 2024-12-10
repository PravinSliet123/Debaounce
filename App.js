import React, { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import Container from "./Container";
function App() {
  const [data, setData] = useState([]);
  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  const getAllProducts = () => {
    setLoading(true);
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((newData) => {
        setData((prevData) => [...prevData, ...newData.products]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, [skip]);

  useDebounce(
    () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setSkip((prevSkip) => prevSkip + limit);
      }
    },
    300 // Debounce delay
  );

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              height: "400px",
              width: "200px",
              overflow: "hidden",
              gap: "10px",
              justifyContent: "space-between",
              margin: "auto",
            }}
          >
            <img
              style={{
                objectFit: "cover",
                height: "90%",
                width: "100%",
              }}
              src={item.thumbnail}
              alt=""
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      <Container />
    </div>
  );
}

export default App;
