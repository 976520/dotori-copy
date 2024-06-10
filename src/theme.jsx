/*
https://jaegyunfe.tistory.com/18
https://github.com/tlsgmltjd/TIL/blob/main/React/styled-components.md
*/
const themeRoot = document.getElementById("root-theme");
let dongGuRaMiRight;
let dongGuRaMiBackground;
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
        dongGuRaMiBackground = "var(--NEUTRAL_N30)";
        localStorage.setItem("selector-color", "#626274");
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
        dongGuRaMiBackground = "var(--BACKGROUND_CARD)";
        localStorage.setItem("selector-color", "#cdcdd5");
      } catch (error) {} //element를 불러올 수 없는 경우
    }
    localStorage.setItem("themeRight", themeRight);
  }, [theme]);

  return (
    <div id="theme-wrapper">
      <div
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
        <div id="dong-gu-ra-mi" style={{ right: themeRight, backgroundColor: dongGuRaMiBackground }}>
          <img id="switch-svg" src={svg}></img>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Theme />, themeRoot);
