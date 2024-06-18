import styled from 'styled-components';
import './App.css';
import {useEffect, useState} from "react";

/*
* TODO :
*   1. localstorage versioning
*     1-1. remove btn click event => this localstorage data remove check
*     1-2. useEffect dependencies "data" input => loop error check
*   2. file code cleaning
*
* */
//styled compontents start
const Wrap = styled.div`
  width:100%; min-height:100vh; display:flex; justify-content: center; align-items: center; background-color:gray;

`;
const TodoWrap = styled.div`
  min-width:350px; border-radius:10px; background-color:white;
`
const ViewTypeWrap = styled.div`
  margin:0 10px; padding:20px 0; font-size:0; text-align:right;
  
  & button {
    display:inline-block; cursor:pointer; color:orange; font-size:16px; font-weight:bold; outline:none; border:none; background-color:transparent;
    
    &.active { border-bottom:2px solid orange; }
  }
`;

const ViewWrap = styled.div`
  min-height:250px; margin:0 10px; padding:20px 0; border-top:1px solid gray; 
`
const InputItem = styled.div`
  margin-top:5px;
  & input { width:15px; height:15px; }
  & label { min-width:280px; display:inline-block; vertical-align:top; text-overflow:ellipsis; overflow:hidden; white-space:nowrap; }
  & button { width:20px; height:20px; color:white; cursor:pointer; outline:none; border:none; background-color:gray; }
  &:first-child { margin-top:0; }
`

const AddWrap = styled.div`
  padding:10px;
  
  & input { 
    width:260px; padding:5px;
  }
  & button[type="submit"] {
    padding:7px 15px; color:#a92323; cursor:pointer; border-radius:0 4px 4px 0; font-size:14px; outline:none; border:none; background-color:orange; 
  }
`


function App() {
  const [inputText, setInputText] = useState();
  const category = ["All", "Active", "Completed"];
  const [show, setShow] = useState("All");
  const [data, setData] = useState([
    /*{
      checked:false,
      content:"강의 가기",
      delete:false,
    },
    {
      checked:true,
      content:"카페가기",
      delete:false,
    },
    {
      checked:false,
      content:"청소하기",
      delete:false,
    }*/
  ]);
  //const storage = [];
  //localStorage.setItem('data', JSON.stringify(data));
  //console.log(JSON.stringify(data));

  //최초 접속 시 데이터 0개일 것
  //접속 시 데이터 확인 후
  useEffect(() => {
    let storage = localStorage.getItem('data');

    if(storage === "[]" || storage === null) {
      //값이 없을 경우
      console.log("null")

      //storage = [];
    }else {
      //값이 있을 경우
      storage = JSON.parse(storage);
      setData([...storage])
    }
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  console.log(data);

  return (
    <div className="App">
      <Wrap>
        <form action="">
          <TodoWrap>
            <ViewTypeWrap>
              <button type="button" className={show === category[0] ? "active" : null} onClick={()=>{
                setShow(category[0]);
              }}>{category[0]}</button>
              <button type="button" className={show === category[1] ? "active" : null} onClick={()=>{
                setShow(category[1]);
              }}>{category[1]}</button>
              <button type="button" className={show === category[2] ? "active" : null} onClick={()=>{
                setShow(category[2]);
              }}>{category[2]}</button>
            </ViewTypeWrap>
            <ViewWrap>
              {
                data.map(function(element, index){
                  if(element.delete){
                    //true
                    return null;
                  }else {
                    //false
                    if(!element.checked && show === category[1]){
                      //Active
                      return <InputItems element={element} index={index} data={data} setData={setData}/>
                    }else if(element.checked && show === category[2]){
                      //Completed
                      return <InputItems element={element} index={index} data={data} setData={setData}/>
                    }else if(show === category[0]) {
                      return <InputItems element={element} index={index} data={data} setData={setData}/>
                    }else {
                      return null;
                    }
                  }
                })
              }
            </ViewWrap>
            <AddWrap>
              <input type="text" placeholder="입력란..." value={inputText || ""} onChange={(event)=>{setInputText(event.target.value)}}></input>
              <button type="submit" onClick={(event)=>{
                event.preventDefault();

                setInputText("");
                setData((prev)=>([
                  ...prev, {
                    checked:false,
                    content:inputText,
                    delete:false,
                }]))
              }}>Add</button>
            </AddWrap>
          </TodoWrap>
        </form>
      </Wrap>
    </div>
  );
}

function InputItems(props) {
  return <InputItem>
    <input type="checkbox" id={`item${props.index}`} checked={props.element.checked} onChange={()=>{
      const copy = [...props.data];
      copy[props.index].checked = !copy[props.index].checked;
      props.setData(copy)
    }}/>
    <label htmlFor={`item${props.index}`}>{props.element.content}</label>
    <button type="button" onClick={()=>{
      const copy = [...props.data];
      copy[props.index].delete = true;
      props.setData(copy)

    }}>X</button>
  </InputItem>
}
export default App;
