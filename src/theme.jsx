/*
https://jaegyunfe.tistory.com/18
https://github.com/tlsgmltjd/TIL/blob/main/React/styled-components.md
*/
const themeRoot = document.getElementById("root-theme");
let dongGuRaMiRight;
let switchContainerBackground;
const dotori3DDark = document.getElementById("dotori-3d-dark");
const dotori3DLight = document.getElementById("dotori-3d-light");
const sikSelector = document.getElementById("sik-selector");

function Theme() {
  const [theme, setTheme] = React.useState(localStorage.getItem("theme"));
  const [themeRight, setThemeRight] = React.useState(localStorage.getItem("themeRight"));
  const [svg, setSvg] = React.useState();

  React.useEffect(() => {
    //새로고침 할 때 테마 이상하게되는거 수정
    if (theme === "light") {
      switchTheme("dark");
    } else {
      switchTheme("light");
    }
  }, []);

  const switchTheme = (index) => {
    if (index === "dark") {
      setTheme("dark");
    } else if (index === "light") {
      setTheme("light");
    }
    localStorage.setItem("theme", theme);
  };
  React.useEffect(() => {
    if (theme === "light") {
      document.body.dataset.theme = "dark";
      setThemeRight("5px");
      setSvg("/public/image/theme-dark.svg");
      switchContainerBackground = "var(--BACKGROUND_CARD)";
      try {
        //element 스타일 변경
        dotori3DDark.style.opacity = "1";
        dotori3DLight.style.opacity = "0";
        sikSelector.style.background = "var(--NEUTRAL_N30)";
      } catch (error) {} //element를 불러올 수 없는 경우
    } else if (theme === "dark") {
      document.body.dataset.theme = "light";
      setThemeRight("35px");
      setSvg("/public/image/theme-light.svg");
      switchContainerBackground = "var(--NEUTRAL_N40)";
      try {
        //element 스타일 변경
        dotori3DDark.style.opacity = "0";
        dotori3DLight.style.opacity = "1";
        sikSelector.style.background = "var(--BACKGROUND_CARD)";
      } catch (error) {} //element를 불러올 수 없는 경우
    }
    localStorage.setItem("themeRight", themeRight);
  }, [theme]);

  const ThemeWrapper = styled.div`
    transition: all 0.2s ease-in-out;
  `;

  const DongGuRaMi = styled.div``;

  const SwitchContainer = styled.div`
    transition: all 0.2s ease-in-out;
    z-index: 3;
  `;
  const SwitchImg = styled.img``;
  return (
    <ThemeWrapper>
      <SwitchContainer
        id="switch-container"
        style={{ backgroundColor: switchContainerBackground }}
        onClick={() => {
          if (theme === "light") {
            switchTheme("dark");
          } else if (theme === "dark") {
            switchTheme("light");
          }
        }}
      >
        <DongGuRaMi id="dong-gu-ra-mi" style={{ right: themeRight }}>
          <SwitchImg id="switch-svg" src={svg}></SwitchImg>
        </DongGuRaMi>
      </SwitchContainer>
    </ThemeWrapper>
  );
}

ReactDOM.render(<Theme />, themeRoot);
