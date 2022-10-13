import { useCallback, useState } from "react";

const TestPage = () => {
  const [counter, setCounter] = useState(0);

  //   const handleClick = () => {
  //     setCounter(counter + 1);
  //   };

  const handleClick = useCallback(() => {
    setCounter(counter + 1);
  }, []);

  return (
    <>
      <div>
        Counter:{counter}
        <br />
        <button onClick={handleClick}>+1</button>
      </div>
    </>
  );
};

export default TestPage;
