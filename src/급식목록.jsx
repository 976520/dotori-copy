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

const DisplayMeal = ({ mealData, mealType }) => {
  if (!mealData) {
    return <p>{mealType}이 없습니다.</p>;
  }

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

  const updateMealType = () => {
    setMealType(localStorage.getItem("meal"));
  };

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

  React.useEffect(() => {
    window.addEventListener("storage", updateMealType);

    return () => {
      window.removeEventListener("storage", updateMealType);
    };
  }, []);

  if (error) {
    return <div id="meal-info">{error}</div>;
  }

  return (
    <div id="meal-info">
      {mealType === "조식" && <DisplayMeal mealData={todayMeal[0]} mealType={mealType} />}
      {mealType === "중식" && <DisplayMeal mealData={todayMeal[1]} mealType={mealType} />}
      {mealType === "석식" && <DisplayMeal mealData={todayMeal[2]} mealType={mealType} />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("급식목록-root"));
