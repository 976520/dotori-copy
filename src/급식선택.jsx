function App() {
  const [selectedMeal, setSelectedMeal] = React.useState(localStorage.getItem("meal"));
  const [selectorLeft, setSelectorLeft] = React.useState(localStorage.getItem("selector-left"));

  const selectMeal = (meal) => {
    setSelectedMeal(meal);
    if (meal === "조식") {
      localStorage.setItem("selector-left", "0px");
      localStorage.setItem("meal", "조식");
    } else if (meal === "중식") {
      localStorage.setItem("selector-left", "100px");
      localStorage.setItem("meal", "중식");
    } else if (meal === "석식") {
      localStorage.setItem("selector-left", "200px");
      localStorage.setItem("meal", "석식");
    }
    setSelectorLeft(localStorage.getItem("selector-left"));
  };

  return (
    <div>
      <div id="sik-selector-background">
        <div id="sik-selector" style={{ left: selectorLeft }}>
          {selectedMeal}
        </div>
        <div id="breakfast-zone" onClick={() => selectMeal("조식")}>
          조식
        </div>
        <div id="lunch-zone" onClick={() => selectMeal("중식")}>
          중식
        </div>
        <div id="dinner-zone" onClick={() => selectMeal("석식")}>
          석식
        </div>
      </div>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("급식-root"));
