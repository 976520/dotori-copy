const bab = async (date) => {
  try {
  } catch (error) {}
}; //급식 API

function App() {
  const [selectedMeal, setSelectedMeal] = React.useState(localStorage.getItem("meal"));
  const [selectorLeft, setSelectorLeft] = React.useState(localStorage.getItem("left"));

  const selectMeal = (meal) => {
    setSelectedMeal(meal);
    if (meal === "조식") {
      localStorage.setItem("left", "0px");
      localStorage.setItem("meal", "조식");
    } else if (meal === "중식") {
      localStorage.setItem("left", "100px");
      localStorage.setItem("meal", "중식");
    } else if (meal === "석식") {
      localStorage.setItem("left", "200px");
      localStorage.setItem("meal", "석식");
    }
    setSelectorLeft(localStorage.getItem("left"));
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

const root = document.getElementById("급식-root");
ReactDOM.render(<App />, root);
