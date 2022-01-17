import React, { useState, useEffect} from "react";
import styles from "./map.module.css";
import Async from "react-async";


export const Map = (props) => {
  
  const [number, setNumber] = useState(null);
  let date = props.date;
  let temp = date.toISOString().slice(0,-13).concat('00:00:00');

  let API_URL = `https://localhost:5001/api/Entries/GetHowBusyEachTableOnDate?date=${temp}`;
  
  let num = number + 1;
  let urlSearch = `https://localhost:5001/api/Entries/SearchTableInfoByIdTable?idTable=${num}&date=${temp}`;

  const TablesColors = () => 
    fetch(API_URL)
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json())


  const SearchTableInfoByIdTable = () =>
    fetch(urlSearch)
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json())

  let url = `https://localhost:5001/api/Entries/AddEntry?whoTooked=${props.auth.userId}&whichTable=${num}&recordTimes[0]=${date.toISOString().slice(0,-13)}`;

  function getRadio(){
    return (document.myForm.myRadios).value
  }


  const [modalActive, setModalActive] = useState(false);
  const [teext, setTeext] = useState(null);
  
  let activeStyle = styles.active;
  let modalStyle = styles.modal;
  return (
    <div className={styles.map} id='map'>
      <Async promiseFn={TablesColors}>
        <Async.Loading>Загрузка...</Async.Loading>
        <Async.Fulfilled>
          {data => {
            let colooors = [];
            for(let k = 1; k < 11; k++) {
              colooors.push(data[k])
            }
            return(
              <div>
              {colooors.map((color, index) => 
                (<div 
                  key={index.toString()}
                  className={styles.table} 
                  id={(index+1).toString()} 
                  onClick={() => {setModalActive(true); setNumber(index)}}
                  style={color ==='FullFree' ? green : ((color === 'FullBusy') ? red : blue)}>{index+1}</div>
              ))}
            </div>
            )      
          }}
        </Async.Fulfilled>
        <Async.Rejected>
          {error => console.log(error.message)}
        </Async.Rejected>
      </Async>
      <div className={modalActive ? activeStyle : modalStyle} onClick={() => setModalActive(false)}>
          <div onClick={e => e.stopPropagation()}>
            <Async promiseFn={SearchTableInfoByIdTable}>
              <Async.Loading>Загрузка...</Async.Loading>
              <Async.Fulfilled>
                {data => {
                  let freeTime = ['09:00:00','10:00:00','11:00:00','12:00:00','13:00:00',
                    '14:00:00','15:00:00','16:00:00','17:00:00','18:00:00','19:00:00','20:00:00'];
                  let day = temp.slice(0,-9);
                  if(data.length !== 0) {
                    for(let i = 0; i < data.length; i++) {
                      freeTime = freeTime.filter((x)=>{return x != ((data[i].recordTime).slice(11))})
                    }
                  }
                  return( 
                    <form className={styles.form} name="myForm">
                      {freeTime.map(info => 
                        (<div key='1'>
                          <input className="radio" type='radio' id={info} name='myRadios' value={info} onClick={() => {setTeext(getRadio());}}/>
                          <label htmlFor={info}>{(info).slice(0,-3)}</label>
                        </div>
                        
                      ))}
                      <button 
                        type="submit" 
                        className={styles.enterButton}
                        formAction={url.concat(teext)}
                        formMethod="POST">Забронировать</button>
                    </form>   
                  )
                }}
              </Async.Fulfilled>
              <Async.Rejected>
                {error => console.log(error.message)}
              </Async.Rejected>
            </Async>
          </div>
      </div>
    </div>
  );
}


const green = {backgroundColor: 'rgba(0, 102, 0, 0.6)'}

const red = {backgroundColor: 'rgba(204, 0, 0, 0.6)'}

const blue = {backgroundColor: 'rgba(0, 153, 255, 0.6)'}