import React, { useEffect, useState } from "react";
import CategoryMenuList from "../components/CategoryMenuList";
import Carousel from "../components/Carousel";

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/menuItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setMenuItems(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
    <div>
        <Carousel />
        <div className="form-outline justify-content-center m-5 ">
          <input
            type="search"
            id="searchBar"
            className="form-control"
            placeholder="Search the Menu"
            aria-label="Search"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="container ">
        <CategoryMenuList
          foodCat={foodCat}
          menuItems={menuItems}
          search={search}
        />
      </div>
    </div>
  );
};

export default Home;
