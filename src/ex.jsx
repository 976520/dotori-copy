const [count, setCount] = useState(0);

useEffect(() => {
  // 매 초마다 count를 증가시키는 타이머 설정
  const timer = setInterval(() => {
    setCount((prevCount) => prevCount + 1);
  }, 1000);

  // 클린업 함수: 타이머를 정리
  return () => {
    clearInterval(timer);
  };
}, []); // 빈 배열을 두 번째 인자로 전달하여, 이 useEffect는 컴포넌트가 마운트될 때만 실행됨.

return (
  <div>
    <p>Count: {count}</p>
  </div>
);
