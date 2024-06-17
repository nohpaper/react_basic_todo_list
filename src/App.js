import styled from 'styled-components';
import './App.css';
import {useState} from "react";

/*
* TODO :
*   1. ViewWrap 안에 있는 if return 태그 하나로
*   2. AddWrap 안에 있는 input에 입력, submit 클릭 시 useState 화
*   3. localstorage 화
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
  const category = ["All", "Active", "Completed"];
  const [show, setShow] = useState("All");
  const [data, setData] = useState([
    {
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
    }
  ]);
  console.log(data);

  return (
    <div className="App">
      <Wrap>
        <form action="">
          <TodoWrap>
            <ViewTypeWrap>
              <button type="button" className={show === category[0] && "active"} onClick={()=>{
                setShow(category[0]);
              }}>{category[0]}</button>
              <button type="button" className={show === category[1] && "active"} onClick={()=>{
                setShow(category[1]);
              }}>{category[1]}</button>
              <button type="button" className={show === category[2] && "active"} onClick={()=>{
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
                      console.log(element);

                      return <InputItem>
                        <input type="checkbox" id={`item${index}`} checked={element.checked} onChange={()=>{
                          const copy = [...data];
                          copy[index].checked = !copy[index].checked;
                          setData(copy)
                        }}/>
                        <label htmlFor={`item${index}`}>{element.content}</label>
                        <button type="button" onClick={()=>{
                          const copy = [...data];
                          copy[index].delete = true;
                          setData(copy)
                        }}>X</button>
                      </InputItem>
                    }else if(element.checked && show === category[2]){
                      //Completed
                      return <InputItem>
                        <input type="checkbox" id={`item${index}`} checked={element.checked} onChange={()=>{
                          const copy = [...data];
                          copy[index].checked = !copy[index].checked;
                          setData(copy)
                        }}/>
                        <label htmlFor={`item${index}`}>{element.content}</label>
                        <button type="button" onClick={()=>{
                          const copy = [...data];
                          copy[index].delete = true;
                          setData(copy)
                        }}>X</button>
                      </InputItem>
                    }else if(show === category[0]) {
                      return <InputItem>
                        <input type="checkbox" id={`item${index}`} checked={element.checked} onChange={()=>{
                          const copy = [...data];
                          copy[index].checked = !copy[index].checked;
                          setData(copy)
                        }}/>
                        <label htmlFor={`item${index}`}>{element.content}</label>
                        <button type="button" onClick={()=>{
                          const copy = [...data];
                          copy[index].delete = true;
                          setData(copy)
                        }}>X</button>
                      </InputItem>
                    }else {
                      return null;
                    }
                  }
                })
              }
            </ViewWrap>
            <AddWrap>
              <input type="text" placeholder="입력란..."></input>
              <button type="submit">Add</button>
            </AddWrap>
          </TodoWrap>
        </form>
      </Wrap>
    </div>
  );
}

export default App;
