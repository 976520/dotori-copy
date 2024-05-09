const root = document.getElementById("an-ma-eui-ja-root");
let anMaSinChung = "안마의자";
let background = "var(--PRIMARY_P10)";
let color = "white";
let newCounter = 0;
let localCounter = parseInt(localStorage.getItem("anma-counter")) || 0;

function App() {
  const [counter, modifier] = React.useState(localCounter);

  let anMaGauge = (counter / 5) * 500;
  let anMaRadius = "5px 0px 0px 5px";
  let backgroundColor = "var(--SUB_GREEN)";

  if (counter < 3) {
    backgroundColor = "var(--SUB_GREEN)";
  } else if (3 <= counter && counter < 4) {
    backgroundColor = "var(--SUB_YELLOW)";
  } else if (4 <= counter && counter <= 5) {
    backgroundColor = "var(--SUB_RED)";
  }
  if (counter == 5) {
    anMaSinChung = "신청불가";
    background = "var(--PRIMARY_P30)";
    color = "var(--NEUTRAL_N30)";
    anMaRadius = "5px 5px 5px 5px";
  }

  const onClick = () => {
    if (counter != 5) {
      const newCounter = counter + 1;
      modifier(newCounter);
      localStorage.setItem("anma-counter", newCounter.toString()) || 0;
    }
  };

  return (
    <div>
      <div id="an-ma-people-container">
        <div className="sin-chung-people">{counter}/5</div>
        <div id="an-ma-gauge-background">
          <div
            id="an-ma-gauge"
            style={{
              width: anMaGauge,
              borderRadius: anMaRadius,
              backgroundColor: backgroundColor,
            }}
          ></div>
        </div>
      </div>
      <button id="an-ma-button" style={{ background: background, color: color }} onClick={onClick}>
        {anMaSinChung}
      </button>
    </div>
  );
}
ReactDOM.render(<App />, root);
