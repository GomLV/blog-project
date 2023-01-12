/* eslint-disable */
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let today = new Date();
  let dateFormat = today.getFullYear() + '년 ' + (today.getMonth()+1) + '월 ' + today.getDate() + "일"; 


  /**
   * useState => [넣은 데이터,데이터를 변경할 수 있는 함수] 를 return
   * let [a,b] = [10,100] => a=10, b=100을 쉽게 넣는 방법. ES6의 destructing
   */
  let [글제목,글제목변경] = useState(['남자 코트 추천','강남 우동 맛집','파이썬 독학']);
  let [따봉,따봉변경] = useState([0,0,0]);
  let [날짜,날짜변경] = useState(['2022년 1월 8일','2022년 1월 9일','2022년 1월 10일']);
  let [modal, setModal] = useState(false);
  let [idx, setIdx] = useState(0);
  let [입력값, 입력값변경] = useState('');

  function 글제목설정(title,idx){
    if(title.length>0){
      var newArr = [...글제목];
      newArr[idx] = title;
      글제목변경(newArr);
    }
  }

  function 글제목추가(title){
    //입력된 제목이 있을 때만 추가
    if(title.length>0){
      var newArr = [...글제목];
      newArr.push(title);
      글제목변경(newArr);
      var recommend = [...따봉];
      recommend.push(0);
      따봉변경(recommend)
      var date = [...날짜];
      date.push(dateFormat);
      날짜변경(date);
    }
  }

  function 글제목삭제(idx){
    var newArr = [...글제목];
    newArr.splice(idx,1);
    글제목변경(newArr);
    var recommend = [...따봉];
    recommend.splice(idx,1);
    따봉변경(recommend)
    var date = [...날짜];
    date.splice(idx,1);
    날짜변경(date);
  }
/*
  function 제목정렬(){
    var newArr = [...글제목];
    newArr.sort();
    글제목변경( newArr );
  }
  function 제목역순정렬(){
    var newArr = [...글제목];
    newArr.sort((a,b)=>a>b?-1:1);
    글제목변경( newArr );
  }
*/
  return (
    <div className="App">
      <div className='black-nav'>
        <div>개발 Blog</div>
      </div>

      {
        글제목.map(function( x, i ){
          return (
            <div className='list' key = {i}>
              <h1 onClick={ () => {
                idx == i ? setModal(!modal) : null;
                setIdx(i);
                
              } }>{ x }<span onClick={ (e)=> {
                e.stopPropagation();
                var newArr = [...따봉];
                newArr[i] = newArr[i]+1;
                따봉변경(newArr);
              } }>👍</span>{ 따봉[i] }</h1>
              <p>{ 날짜[i] } 발행</p>
              <button onClick={ ()=>{ 글제목삭제(i) } }>글 삭제</button>
              <hr/>
            </div>
          )
          
        })
      }

      <input type="text" onChange={(e)=>{
        입력값변경(e.target.value);
        console.log(입력값);
      }}></input><button onClick={ ()=>글제목추가(입력값) }>글추가</button>

      {
        modal ? <Modal title = { 글제목 } 날짜 = { 날짜 } Idx = { idx } 글제목설정 = { 글제목설정 }/> : null
      }

    </div>
  );
}
/**
 * Component 유의사항
 * -이름은 대괄호
 * -return() 안에 있는건 태그 하나로 묶어야함
 * -div 여러개 쓰고싶은데 하나로 묶으려고 의미없는 div 쓰기 싫을때 <> </>
 * 
 * Component로 만드는 것들
 * -반복출현하는 HTML 덩어리들
 * -자주 변경되는 HTML UI들
 * -다른 페이지 만들때도 컴포넌트 사용
 * 
 * Component 많이 만들면 단점
 * -state 쓸 때 복잡해짐
 */
function Modal(props){  
  //Component안에서만 쓸거면 여기 state 선언해도됨
  let [상세제목,상세제목수정] = useState('');
  return (
    <div className='modal'>
      <h2>{ props.title[props.Idx] }</h2>
      <p>{ props.날짜[props.Idx] }</p>
      <p>상세내용</p>
      <input type="text" onChange={(e)=>{
        상세제목수정(e.target.value);
      }}></input>
      <button onClick={ ()=>{
        props.글제목설정(상세제목,props.Idx);
      } }>글수정</button>
    </div>
  )
}

export default App;
