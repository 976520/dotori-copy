const clockRootElement = document.getElementById("root-clock");

function Clock() {
  const [clock, setClock] = React.useState(new Date());

  React.useEffect(() => {
    const timerID = setInterval(() => setClock(new Date()), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  const Text = styled.h1`
    font-size: 64px;
    font-weight: 800;
    letter-spacing: 3px;
  `;

  const ClockContainer = styled.div`
    ${Text} {
      position: absolute;
      left: 70px;
    }
  `;

  return (
    <ClockContainer id="clock-text">
      <Text>{clock.toLocaleTimeString()}</Text>
    </ClockContainer>
  );
}

ReactDOM.render(<Clock />, clockRootElement);
