const KEY = "02262453abf84c20b7e104e8be63f648";

// date를 YYYYMMDD <-- 이걸로 포맷
const formatDate = (date) => {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
};

// 급식을 비동기적으로 가꼬오는 컴포
const fetchMeal = async (apiUrl) => {
  try {
    //요청
    const response = await fetch(apiUrl);
    // !성공 -> 에러
    if (!response.ok) {
      throw new Error(`error ${response.status}`);
    }
    // response 데이터를 JSON으로 변환
    const data = await response.json();
    // 급식 정보 확인 후 반환
    if (data.mealServiceDietInfo && data.mealServiceDietInfo[1] && data.mealServiceDietInfo[1].row) {
      return data.mealServiceDietInfo[1].row;
    } else {
      //가차없는오류처리
      throw new Error("error");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 급식목록을 화면에 표시하는 컴포
const DisplayMeal = ({ mealData, mealType }) => {
  //급식 데이터 없을 때 (꼭 오류인게 아니라 걍 학교안가는날에도 이럼)
  if (!mealData) {
    return <p>{mealType}이 없습니다.</p>;
  }

  // 데이터 정규화
  const dishName = mealData.DDISH_NM.match(/[가-힣\s]/g)?.join("") || "";

  return (
    <div className="meal">
      <p>{dishName}</p>
    </div>
  );
};

const App = () => {
  const [todayMeal, setTodayMeal] = React.useState([]);
  const [mealType, setMealType] = React.useState(localStorage.getItem("meal"));
  const [error, setError] = React.useState(null);

  // fetchMeal 호출
  React.useEffect(() => {
    const apiUrlToday = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&MLSV_YMD=${formatDate(new Date())}&Type=json&KEY=${KEY}`;
    fetchMeal(apiUrlToday)
      .then((todayData) => {
        // 급식 데이터를 가꼬왔다 -> 상태 업데이트
        if (todayData) {
          setTodayMeal(todayData);
        } else {
          setError("급식이 없습니다.");
        }
      })
      .catch((error) => {
        setError(`api 요청 중 오류 ${error.message}`);
      });
  }, [mealType]);

  // localStorage의 아점저가 변경되었을 때 상태 업데이트 함수 호출
  React.useEffect(() => {
    window.addEventListener("storage", updateMealType);
    console.log(localStorage.getItem("meal"));
    return () => {
      window.removeEventListener("storage", updateMealType);
    };
  }, []);

  // 위에한테 호출당하는 애
  function updateMealType() {
    setMealType(localStorage.getItem("meal"));
  }

  // mealType에 해당하는 급식 표시 0 1 2 (개선해야할듯 ㄹㅈㄷ비효율)
  if (mealType === "조식") {
    return (
      <div className="meal-info">
        <DisplayMeal mealData={todayMeal[0]} mealType={mealType} />
      </div>
    );
  } else if (mealType === "중식") {
    return (
      <div className="meal-info">
        <DisplayMeal mealData={todayMeal[1]} mealType={mealType} />
      </div>
    );
  } else if (mealType === "석식") {
    return (
      <div className="meal-info">
        <DisplayMeal mealData={todayMeal[2]} mealType={mealType} />
      </div>
    );
  } else if (error) {
    return <div className="meal-info">{error}</div>;
  } else {
    return null;
  }
};

ReactDOM.render(<App />, document.getElementById("급식목록-root"));
