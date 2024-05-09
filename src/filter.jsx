/*
https://github.com/tlsgmltjd/TIL/blob/main/React/component.md
https://github.com/gaoooon/TIL/blob/main/react/props.md
*/

//재사용할 style
const buttonStyle = styled.div`
  border: 1px solid var(--NEUTRAL_N20);
  height: 4.5vh;
  width: 3vw;
  top: 25px;
  left: -10px;
  margin-right: 5px;
  margin-left: 5px;
  position: relative;
  border-radius: 7px;
  transition: all 200ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: var(--NEUTRAL_N20);
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
`;
const containerStyle = styled.div`
  height: 9.5vh;
  width: 18vw;
  margin-top: 0px;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  transition: all 200ms ease-in-out;
  top: -15px;
  h2 {
    position: relative;
    top: -15px;
    left: 20px;
    font-size: 14px;
    font-weight: 800px;
    color: var(--NEUTRAL_N10);
  }
`;

//Search 요소 style
const SearchContainer = styled.div`
  height: 9.5vh;
  width: 18vw;
  margin-top: 0px;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  top: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  height: 52px;
  width: 12vw;
  border-radius: 7px;
  position: relative;
  padding-left: 50px;
  background-color: var(--NEUTRAL_N50);
  display: flex;
  font-size: 14px;
  color: var(--NEUTRAL_N10);
  cursor: text;
  border: none;
  ${(props) => props.searchOutline && `outline: 1px solid var(--PRIMARY_P10);`}
`;

const SearchImg = styled.div`
  position: absolute;
  top: 20px;
  left: 35px;
`;
function Search({
  setSearchOutline,
  setSearchImgOpacity,
  setSearchValue,
  searchOutline,
  searchImgOpacity,
  searchValue,
}) {
  return (
    <SearchContainer>
      <SearchInput
        id="search"
        type="input"
        maxLength="4"
        placeholder="이름을 입력해 주세요."
        onFocus={() => {
          setSearchImgOpacity(1);
          setSearchOutline("1px solid var(--PRIMARY_P10)");
        }}
        onBlur={() => {
          setSearchImgOpacity(0.4);
          setSearchOutline("");
        }}
        searchOutline={searchOutline}
      />
      <SearchImg style={{ opacity: searchImgOpacity }} alt="search">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="var(--NEUTRAL_N10)"
          class="frontIcon"
        >
          <circle cx="11" cy="11" r="8" stroke="var(--NEUTRAL_N10)" stroke-width="2" />
          <path d="M20.2426 20.2426L17 17" stroke="var(--NEUTRAL_N10)" stroke-width="2" stroke-linecap="round" />
        </svg>
      </SearchImg>
    </SearchContainer>
  );
}

function Grade({ onClickGrade, selectFirstGrade, selectSecondGrade, selectThirdGrade }) {
  const GradeContainer = styled(containerStyle)``;
  const GradeText = styled.h2``;
  const FirstGrade = styled(buttonStyle)``;
  const SecondGrade = styled(buttonStyle)``;
  const ThirdGrade = styled(buttonStyle)``;

  return (
    <GradeContainer>
      <GradeText>학년</GradeText>
      <FirstGrade
        className={`filter-button  ${selectFirstGrade && "button-selected"}`}
        type="button"
        onClick={() => onClickGrade(1)}
      >
        1
      </FirstGrade>
      <SecondGrade
        className={`filter-button  ${selectSecondGrade && "button-selected"}`}
        type="button"
        onClick={() => onClickGrade(2)}
      >
        2
      </SecondGrade>
      <ThirdGrade
        className={`filter-button  ${selectThirdGrade && "button-selected"}`}
        type="button"
        onClick={() => onClickGrade(3)}
      >
        3
      </ThirdGrade>
    </GradeContainer>
  );
}

function Class({ onClickClass, selectFirstClass, selectSecondClass, selectThirdClass, selectFourthClass }) {
  const ClassContainer = styled(containerStyle)``;
  const ClassText = styled.h2``;
  const FirstClass = styled(buttonStyle)``;
  const SecondClass = styled(buttonStyle)``;
  const ThirdClass = styled(buttonStyle)``;
  const FourthClass = styled(buttonStyle)``;

  return (
    <ClassContainer>
      <ClassText>반</ClassText>
      <FirstClass
        className={`filter-button  ${selectFirstClass && "button-selected"}`}
        type="button"
        onClick={() => onClickClass(1)}
        style={{ marginLeft: "19px" }}
      >
        1
      </FirstClass>
      <SecondClass
        className={`filter-button  ${selectSecondClass && "button-selected"}`}
        type="button"
        onClick={() => onClickClass(2)}
      >
        2
      </SecondClass>
      <ThirdClass
        className={`filter-button  ${selectThirdClass && "button-selected"}`}
        type="button"
        onClick={() => onClickClass(3)}
      >
        3
      </ThirdClass>
      <FourthClass
        className={`filter-button  ${selectFourthClass && "button-selected"}`}
        type="button"
        onClick={() => onClickClass(4)}
      >
        4
      </FourthClass>
    </ClassContainer>
  );
}

function Sex({ onClickSex, selectMale, selectFemale }) {
  const SexContainer = styled(containerStyle)`
    margin-bottom: 5px;
  `;
  const SexText = styled.h2``;
  const Male = styled(buttonStyle)``;
  const Female = styled(buttonStyle)``;
  return (
    <SexContainer>
      <SexText>성별</SexText>
      <Male
        className={`filter-button  ${selectMale && "button-selected"}`}
        type="button"
        onClick={() => onClickSex("male")}
      >
        남자
      </Male>
      <Female
        className={`filter-button  ${selectFemale && "button-selected"}`}
        type="button"
        onClick={() => onClickSex("female")}
      >
        여자
      </Female>
    </SexContainer>
  );
}

function Filter() {
  const [searchOutline, setSearchOutline] = React.useState();
  const [searchImgOpacity, setSearchImgOpacity] = React.useState("0.4");
  const [searchValue, setSearchValue] = React.useState();

  const [selectFirstGrade, setSelectFirstGrade] = React.useState(0);
  const [selectSecondGrade, setSelectSecondGrade] = React.useState(0);
  const [selectThirdGrade, setSelectThirdGrade] = React.useState(0);

  const [selectFirstClass, setSelectFirstClass] = React.useState(0);
  const [selectSecondClass, setSelectSecondClass] = React.useState(0);
  const [selectThirdClass, setSelectThirdClass] = React.useState(0);
  const [selectFourthClass, setSelectFourthClass] = React.useState(0);

  const [selectMale, setSelectMale] = React.useState(0);
  const [selectFemale, setSelectFemale] = React.useState(0);

  function resetGrade() {
    setSelectFirstGrade(0);
    setSelectSecondGrade(0);
    setSelectThirdGrade(0);
  }

  function resetClass() {
    setSelectFirstClass(0);
    setSelectSecondClass(0);
    setSelectThirdClass(0);
    setSelectFourthClass(0);
  }

  function resetSex() {
    setSelectMale(0);
    setSelectFemale(0);
  }

  const onClickGrade = (gradeIndex) => {
    if (gradeIndex === 1) {
      if (selectFirstGrade === 1) {
        setSelectFirstGrade(0);
      } else {
        resetClass();
        setSelectFirstGrade(1);
      }
    } else if (gradeIndex === 2) {
      if (selectSecondGrade === 1) {
        setSelectSecondGrade(0);
      } else {
        resetGrade();
        setSelectSecondGrade(1);
      }
    } else if (gradeIndex === 3) {
      if (selectThirdGrade === 1) {
        setSelectThirdGrade(0);
      } else {
        resetGrade();
        setSelectThirdGrade(1);
      }
    }
  };

  const onClickClass = (classIndex) => {
    if (classIndex === 1) {
      if (selectFirstClass === 1) {
        setSelectFirstClass(0);
      } else {
        resetClass();
        setSelectFirstClass(1);
      }
    } else if (classIndex === 2) {
      if (selectSecondClass === 1) {
        setSelectSecondClass(0);
      } else {
        resetClass();
        setSelectSecondClass(1);
      }
    } else if (classIndex === 3) {
      if (selectThirdClass === 1) {
        setSelectThirdClass(0);
      } else {
        resetClass();
        setSelectThirdClass(1);
      }
    } else if (classIndex === 4) {
      if (selectFourthClass === 1) {
        setSelectFourthClass(0);
      } else {
        resetClass();
        setSelectFourthClass(1);
      }
    }
  };

  const onClickSex = (sexIndex) => {
    if (sexIndex === "male") {
      if (selectMale === 1) {
        setSelectMale(0);
      } else {
        resetSex();
        setSelectMale(1);
      }
    } else if (sexIndex === "female") {
      if (selectFemale === 1) {
        setSelectFemale(0);
      } else {
        resetSex();
        setSelectFemale(1);
      }
    }
  };

  const reset = () => {
    resetGrade();
    resetClass();
    resetSex();

    setSearchImgOpacity("0.4");
    setSearchOutline("");
    document.getElementById("search").value = "";
  };

  const FilterWrapper = styled.div`
    right: 40px;

    position: absolute;
    height: 59vh;
    width: 18vw;
    border-radius: 15px;
    background-color: var(--BACKGROUND_CARD);
    display: flex;
    flex-direction: column;
  `;
  const FilterHeader = styled.div`
    height: 9.5vh;
    width: 18vw;
    margin-top: 0px;
    margin-bottom: 20px;
    display: flex;
    position: relative;
    top: -15px;
  `;

  const ResetButton = styled.div`
    position: absolute;
    font-size: 13px;
    color: var(--NEUTRAL_N20);
    font-weight: 600;
    letter-spacing: -1.5px;
    right: 22px;
    top: 40px;
    cursor: pointer;
    text-decoration-line: none;
  `;

  const FilterText = styled.h2`
    left: 20px;
    top: 25px;
    position: absolute;
    font-size: 17px;
    font-weight: 700;
    color: var(--NEUTRAL_N10);
    letter-spacing: -1px;
  `;

  return (
    <FilterWrapper>
      <FilterHeader>
        <FilterText>필터</FilterText>
        <ResetButton onClick={reset}>초기화</ResetButton>
      </FilterHeader>

      <Search
        setSearchOutline={setSearchOutline}
        setSearchImgOpacity={setSearchImgOpacity}
        setSearchValue={setSearchValue}
        searchImgOpacity={searchImgOpacity}
        searchOutline={searchOutline}
        searchValue={searchValue}
      />
      <Grade
        onClickGrade={onClickGrade}
        selectFirstGrade={selectFirstGrade}
        selectSecondGrade={selectSecondGrade}
        selectThirdGrade={selectThirdGrade}
      />
      <Class
        onClickClass={onClickClass}
        selectFirstClass={selectFirstClass}
        selectSecondClass={selectSecondClass}
        selectThirdClass={selectThirdClass}
        selectFourthClass={selectFourthClass}
      />
      <Sex onClickSex={onClickSex} selectMale={selectMale} selectFemale={selectFemale} />
    </FilterWrapper>
  );
}

const filterRoot = document.getElementById("root-filter");
ReactDOM.render(<Filter />, filterRoot);
