const root = document.getElementById("ja-sup-sin-chung-root");
let jaSupSinChung = "자습신청";
let background = "var(--PRIMARY_P10)";
let color = "white";

function Gauge({ 자습인간 }) {
  let jaSupGauge = (자습인간 / 50) * 500;
  let jaSupRadius = "5px 0px 0px 5px";
  let backgroundColor = "var(--SUB_GREEN)";

  if (자습인간 < 30) {
    backgroundColor = "var(--SUB_GREEN)";
  } else if (30 <= 자습인간 && 자습인간 < 40) {
    backgroundColor = "var(--SUB_YELLOW)";
  } else if (40 <= 자습인간 && 자습인간 <= 50) {
    backgroundColor = "var(--SUB_RED)";
  }
  if (자습인간 === 50) {
    jaSupRadius = "5px 5px 5px 5px";
  }

  return (
    <div id="ja-sup-people-container">
      <div className="sin-chung-people">{자습인간}/50</div>
      <div id="ja-sup-gauge-background">
        <div
          id="ja-sup-gauge"
          style={{ width: jaSupGauge, borderRadius: jaSupRadius, backgroundColor: backgroundColor }}
        ></div>
      </div>
    </div>
  );
}

function Button({ 자습인간, set자습인간 }) {
  let buttonText = jaSupSinChung;
  let buttonBackground = background;
  let buttonColor = color;

  if (자습인간 === 50) {
    buttonText = "신청불가";
    buttonBackground = "var(--PRIMARY_P30)";
    buttonColor = "var(--NEUTRAL_N30)";
  }

  const onClick = () => {
    if (자습인간 < 50) {
      const newCounter = 자습인간 + 1;
      set자습인간(newCounter);
      localStorage.setItem("jasup-counter", newCounter.toString());
    }
  };

  return (
    <button id="ja-sup-button" style={{ background: buttonBackground, color: buttonColor }} onClick={onClick}>
      {buttonText}
    </button>
  );
}

function App() {
  const [자습인간, set자습인간] = React.useState(parseInt(localStorage.getItem("jasup-counter")) || 0);

  return (
    <div>
      <Gauge 자습인간={자습인간} />
      <Button 자습인간={자습인간} set자습인간={set자습인간} />
    </div>
  );
}

ReactDOM.render(<App />, root);
