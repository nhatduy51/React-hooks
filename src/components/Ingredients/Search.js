import React from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredient } = props;
  const [searchFiter, setSearchFilter] = React.useState("");
  React.useEffect(() => {
    const query =
      searchFiter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${searchFiter}"`;
    fetch(
      "https://react-hook-28628-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json" + query
    )
      .then((res) => res.json())
      .then((resData) => {
        const loadedIngredient = [];
        for (const key in resData) {
          loadedIngredient.push({
            id: key,
            title: resData[key].title,
            amount: resData[key].amount,
          });
        }
        onLoadIngredient(loadedIngredient);
      });
  }, [searchFiter, onLoadIngredient]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={searchFiter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
