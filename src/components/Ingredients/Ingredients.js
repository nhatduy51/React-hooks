import React from "react";
import IngredientList from "./IngredientList";
import IngredientForm from "./IngredientForm";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

const Ingredients = () => {
  const [userIngredients, setUerIngredients] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const filterIngredientHandler = React.useCallback((filterValue) => {
    setUerIngredients(filterValue);
  }, []);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch(
      "https://react-hook-28628-default-rtdb.asia-southeast1.firebasedatabase.app/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-type": "application/json" },
      }
    )
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((resData) => {
        setUerIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: resData.name, ...ingredient },
        ]);
      })
      .catch((err) => {
        setError("something went wrong");
      });
  };
  const clearError = () => {
    setError(null);
    setIsLoading(false);
  };
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredient={filterIngredientHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
