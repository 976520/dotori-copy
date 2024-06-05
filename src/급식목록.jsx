const mealListStyle = styled.div``;

const KEY = "02262453abf84c20b7e104e8be63f648";

const mealInfo = styled.div``;

const formatDate = (date) => {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
};

const fetchMeal = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`error ${response.status}`);
    }
    const data = await response.json();
    if (data.mealServiceDietInfo && data.mealServiceDietInfo[1] && data.mealServiceDietInfo[1].row) {
      return data.mealServiceDietInfo[1].row;
    } else {
      throw new Error("error");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

const displayMeal = (mealData, mealType) => {
  React.useEffect(() => {
    mealType = localStorage.getItem("meal");
  }, [mealType]);

  if (!mealData) return <p>{localStorage.getItem("meal")}이 없습니다.</p>;
  return (
    <div className="meal">
      <h2>{mealType}</h2>
      <p>{mealData.DDISH_NM}</p>
    </div>
  );
};

const App = () => {
  const [todayMeal, setTodayMeal] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const apiUrlToday = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=F10&SD_SCHUL_CODE=7380292&MLSV_YMD=${formatDate(new Date())}&Type=json&KEY=${KEY}`;
    fetchMeal(apiUrlToday)
      .then((todayData) => {
        if (todayData) {
          setTodayMeal(todayData);
        } else {
          setError("No meal data");
        }
      })
      .catch((error) => {
        setError(`fetching Error ${error.message}`);
      });
  }, []);

  if (localStorage.getItem("meal") == "조식") {
    return <div id="meal-info">{displayMeal(todayMeal[0])}</div>;
  } else if (localStorage.getItem("meal") == "중식") {
    return <div id="meal-info">{displayMeal(todayMeal[1])}</div>;
  } else if (localStorage.getItem("meal") == "석식") {
    return <div id="meal-info">{displayMeal(todayMeal[2])}</div>;
  } else if (error) {
    return <div id="meal-info">{error}</div>;
  }
};

ReactDOM.render(<App />, document.getElementById("급식목록-root"));
