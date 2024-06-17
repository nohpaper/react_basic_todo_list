import styled, { css } from 'styled-components';
import './App.css';


//styled compontents start
const Test = styled.div`
  padding: 20px;
  background-color:blue;
`
function App() {
  return (
    <div className="App">
      <Test></Test>
      <div></div>
    </div>
  );
}

export default App;
