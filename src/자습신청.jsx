const root = document.getElementById("ja-sup-sin-chung-root");
let jaSupSinChung = "자습신청";
let background = "var(--PRIMARY_P10)";
let color = "white";
let newCounter = 0;
let localCounter = parseInt(localStorage.getItem("jasup-counter")) || 0;

function App() {
  const [counter, setCounter] = React.useState(localCounter);

  let jaSupGauge = (counter / 50) * 500;
  let jaSupRadius = "5px 0px 0px 5px";
  let backgroundColor = "var(--SUB_GREEN)";

  if (counter < 30) {
    backgroundColor = "var(--SUB_GREEN)";
  } else if (30 <= counter && counter < 40) {
    backgroundColor = "var(--SUB_YELLOW)";
  } else if (40 <= counter && counter <= 50) {
    backgroundColor = "var(--SUB_RED)";
  }
  if (counter === 50) {
    jaSupSinChung = "신청불가";
    background = "var(--PRIMARY_P30)";
    color = "var(--NEUTRAL_N30)";
    jaSupRadius = "5px 5px 5px 5px";
  }

  const onClick = () => {
    if (counter < 50) {
      const newCounter = counter + 1;
      setCounter(newCounter);
      localStorage.setItem("jasup-counter", newCounter.toString());
    }
  };

  return (
    <div>
      <div id="ja-sup-people-container">
        <div className="sin-chung-people">{counter}/50</div>
        <div id="ja-sup-gauge-background">
          <div
            id="ja-sup-gauge"
            style={{ width: jaSupGauge, borderRadius: jaSupRadius, backgroundColor: backgroundColor }}
          ></div>
        </div>
      </div>
      <button id="ja-sup-button" style={{ background: background, color: color }} onClick={onClick}>
        {jaSupSinChung}
      </button>
    </div>
  );
}

ReactDOM.render(<App />, root);
