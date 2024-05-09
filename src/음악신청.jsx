/*
그저 빛.....
https://github.com/tlsgmltjd/TIL/blob/main/React/axios.md
https://github.com/gaoooon/TIL/blob/main/react/library/axios.md
https://jaegyunfe.tistory.com/2
*/

const musicTitle = async (videoId) => {
  //요청과 응답이 불확정?적해요
  try {
    const response = await axios.get(
      //promise api (비동기)
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id: videoId,
          key: "AIzaSyBWC114jh4O6wMRsnuM_hHe92v2wW5cKjU",
        },
      }
    );
    const title = response.data.items[0].snippet.title;
    return title;
  } catch (error) {
    //프로미스 거부 오류
    console.error(error);
    return "ㅋ";
  }
}; //영상ID로 api에 요청 -> 제목 받아서 await으로 기다리고있는 녀석한테 promise 반환

const judgeUrl = (text) => {
  return /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gi.test(text);
}; //정규식

function App() {
  const [total, setTotal] = React.useState(0); //총 신청곡 개수
  const [n, setN] = React.useState(0); //신청딘 노래마다 고유번호? 부여
  const [thumbnails, setThumbnails] = React.useState([]);

  const [valueInInput, setValueInInput] = React.useState(validate);

  const [urlOpacity, setUrlOpacity] = React.useState();
  const [buttonColor, setButtonColor] = React.useState();

  React.useEffect(() => {
    const text = document.getElementById("url-input").value;
    if (text !== "") {
      setButtonColor("var(--PRIMARY_P10)");
    } else if (text === "") {
      setButtonColor("var(--PRIMARY_P30)");
    }
  }, []);

  const validate = (e) => {
    const text = document.getElementById("url-input").value;
    if (text !== "") {
      setUrlOpacity(0);
      validate("false");
    } else if (text === "") {
      setUrlOpacity(1);
    }

    if (e == "true") {
      setUrlOpacity(0);
    } else if (e === "false") {
      if (valueInInput == "false") {
        setUrlOpacity(0);
      } else if (valueInInput == "true") {
        setUrlOpacity(1);
      }
    }
  };

  let upSupOpacity = "0"; //아직 신청한 음악이 없습니다..
  if (total == 0) {
    upSupOpacity = 1;
  }

  const clickSubmitButton = async () => {
    const text = document.getElementById("url-input").value;
    const input = document.getElementById("url-input");
    try {
      if (!judgeUrl(text)) {
        //응 input에 ㅈ같은거 넣어봐~ return하면 그만이야~~
        setUrlOpacity(0);
        return input.focus(); //강제 focus
      } else {
        document.getElementById("url-input").value = "";
        setTotal(total + 1);
        setN(n + 1); //신청할때마다 고유번호+1(total이랑 별개로) -> 겹치는거 없이
      }
    } catch (error) {
      return input.focus();
    }

    const container = document.getElementById("sin-chung-container");
    const videoId = text.match(/v=(\w+)/)[1]; //정규식으로 링크에서 ID 뽑아먹기 -> 제목,썸넬에서 사용

    //신청곡 한 칸
    const musicElement = document.createElement("div");
    musicElement.className = "music";
    musicElement.id = "music" + n;
    container.appendChild(musicElement);

    //제목
    const title = await musicTitle(videoId);
    const titleElement = document.createElement("div");
    titleElement.className = "title";
    titleElement.id = "title" + n;
    titleElement.innerText = title; //프로미스 결과를 텍스트로 설정
    musicElement.appendChild(titleElement);

    //썸넬
    const thumbnailUrl = "https://img.youtube.com/vi/" + videoId + "/mqdefault.jpg";
    const thumbnailElement = document.createElement("img");
    const thumbnailContainer = document.getElementById("music" + n);
    setThumbnails([thumbnails, thumbnailUrl]);
    thumbnailElement.className = "thumbnail";
    thumbnailElement.id = "thumbnail" + n;
    thumbnailElement.src = thumbnailUrl;
    thumbnailContainer.appendChild(thumbnailElement);

    //삭제버튼ㄴ
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.id = "delete-button" + n;
    deleteButton.addEventListener("click", () => clickDeleteButton(n));
    musicElement.appendChild(deleteButton);
    //삭제버튼이미지
    const deleteButtonSvg = document.createElement("img");
    deleteButtonSvg.className = "del-button-svg";
    deleteButtonSvg.id = "del-button-svg" + n;
    deleteButtonSvg.src = "svg/del-button.svg";
    deleteButton.appendChild(deleteButtonSvg);

    //링크버튼
    const linkButton = document.createElement("button");
    linkButton.className = "link-button";
    linkButton.id = "link-button" + n;
    linkButton.addEventListener("click", () => {
      window.open("https://www.youtube.com/watch?v=" + videoId, "_blank");
    });
    musicElement.appendChild(linkButton);
    //링크버튼이미지
    const linkButtonSvg = document.createElement("img");
    linkButtonSvg.className = "link-button-svg";
    linkButtonSvg.id = "link-button-svg" + n;
    linkButtonSvg.src = "svg/link-button.svg";
    linkButton.appendChild(linkButtonSvg);
  };

  function clickDeleteButton(index) {
    //삭제
    const container = document.getElementById("sin-chung-container");
    const musicElement = document.getElementById("music" + index);
    container.removeChild(musicElement);
    setTotal((prevTotal) => prevTotal - 1);
    setThumbnails((prevThumbnails) => prevThumbnails.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div id="music-sin-chung">
        <h2>음악 신청</h2>
        <input
          type="url"
          id="url-input"
          onFocus={() => validate("true")}
          onBlur={() => validate("false")}
          onChange={() => setValueInInput("true")}
        />
        <p style={{ opacity: urlOpacity }}>URL을 입력해 주세요</p>
        <div id="sin-chung-ha-gi" onClick={clickSubmitButton} style={{ background: buttonColor }}>
          신청하기
        </div>
      </div>

      <div id="sin-chung-list">
        <h2>신청음악</h2>
        <p>
          <span>{total}</span> 개
        </p>
        <div id="sin-chung-container"></div>
        <div id="up-sup-ni-da" style={{ opacity: upSupOpacity }}>
          <div>
            <svg width="120" height="122" viewBox="0 0 120 122" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="37.0577"
                cy="94.757"
                r="11.5045"
                transform="rotate(15 37.0577 94.757)"
                stroke="var(--NEUTRAL_N10)"
                strokeWidth="8"
              />
              <circle
                cx="87.9352"
                cy="98.0393"
                r="11.5093"
                transform="rotate(15 87.9352 98.0393)"
                stroke="var(--NEUTRAL_N10)"
                strokeWidth="8"
              />
              <path
                d="M99.0537 101.017L110.7 57.5505M48.1691 97.7355L59.816 54.2688M59.816 54.2688L64.9924 34.9503C88.1746 41.1619 106.965 39.2949 115.877 38.232L110.7 57.5505M59.816 54.2688C70.2802 57.0727 91.2433 60.6191 110.7 57.5505"
                stroke="var(--NEUTRAL_N10)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M59.8151 54.2681C70.2793 57.072 91.2424 60.6185 110.7 57.5498"
                stroke="var(--NEUTRAL_N20)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M48.169 97.7342L64.9922 34.9492"
                stroke="var(--NEUTRAL_N10)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="10"
                cy="10"
                r="10"
                transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 37.2495 40.873)"
                stroke="var(--NEUTRAL_N10)"
                strokeWidth="8"
              />
              <path
                d="M16.0342 33.8003L40.7827 9.05176C35.4794 10.8195 30.1761 12.5873 23.105 9.05176"
                stroke="var(--NEUTRAL_N10)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M40.7822 9.05176C35.4789 10.8195 30.1756 12.5873 23.1046 9.05176"
                stroke="var(--NEUTRAL_N20)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>아직 신청한 음악이 없습니다..</h1>
          <h2>오른쪽 위에서 음악 신청을 해보세요!</h2>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("음악신청-root"));
