import React, { useState, useEffect} from "react";
import styles from "./map.module.css";
import { ModalWindow } from "../Modal";
import Async from "react-async";



export const Map = (props) => {
  let date = props.date;
  let API_URL = "https://localhost:5001/api/Entries/GetHowBusyEachTableOnDate?date=";
  let temp = date.toISOString().slice(0,-13).concat('00:00:00');
  API_URL = API_URL.concat(temp);

  const TablesColors = () => 
    fetch(API_URL)
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json())


  const fasdfsadf = () =>
    fetch(url)
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

    
  let colors = []
  let id = 0;
  const [modalActive, setModalActive] = useState(false);
  
  return (
    <div className={styles.map} id='map'>
      <Async promiseFn={TablesColors}>
        <Async.Loading>Loading...</Async.Loading>
        <Async.Fulfilled>
          {data => {
            let colooors = []
            let elem;
            for(let k = 1; k < 11; k++) {
              colooors.push(data[k])
              switch(data[k]){
                case 'FullFree':
                  elem = green;
                  break;

                case 'FullBusy':
                  elem = red;
                  break;

                case 'PartiallyBusy':
                  elem = blue;
                  break
              }
            }
            return(
              <div>
              {colooors.map((color, index) => 
                (<div 
                  key={index.toString()}
                  className={styles.table} 
                  id={index.toString()} 
                  onClick={() => {setModalActive(true); id={index}; console.log(id)}}
                  style={color ==='FullFree' ? green : ((color === 'FullBusy') ? red : blue)}>{index+1}</div>
              ))}
            </div>
            )      
          }}
        </Async.Fulfilled>
        <Async.Rejected>
          {error => console.log('мда.....треш '+error.message)}
        </Async.Rejected>
      </Async>

      <div>
        <ModalWindow active={modalActive} setActive={setModalActive} date={props.date} id={id}/>
        <Async>

        </Async>
      </div>
    </div>
  );
}


const green = {backgroundColor: 'rgba(0, 102, 0, 0.6)'}

const red = {backgroundColor: 'rgba(204, 0, 0, 0.6)'}

const blue = {backgroundColor: 'rgba(0, 153, 255, 0.6)'}