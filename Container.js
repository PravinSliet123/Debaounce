import React, { useEffect, useRef, useState } from "react";
import useDebounce from "./useDebounce";

function ScrollableContainer() {
  const containerRef = useRef();
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
        containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight - 50
      ) {
        setSkip((prevSkip) => prevSkip + limit);
      }
    },
    300,
    containerRef
  );

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "500px",
        overflowY: "scroll",
        border: "1px solid #ccc",
      }}
    >
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
    </div>
  );
}

export default ScrollableContainer;
