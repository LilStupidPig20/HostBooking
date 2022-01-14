import React, { useState } from "react";
import styles from "./map.module.css";
import styled from 'styled-components'
import { ModalWindow } from "../Modal";

export const Map = (props) => {
    let fullness = Promise.resolve(props.fullness);
    const [modalActive, setModalActive] = useState(false);

    function printTables(){
      let template = [];
            fullness.then(function(v) {
            for(let k = 1; k < 11; k++){
              let strrr = String(k)
              let elem = document.getElementById(k);
              switch(v[k]) {
                case 'FullFree': 
                  console.log('смачный пердеж')
                  break;

                case 'FullBusy':
                  elem.style = red;
                  break;

                case 'PartiallyBusy':
                  elem.style = blue;
                  break;
              }
            }
    })
    return template; 
  }
    
  return (
    <div className={styles.map}>
      <div className={styles.table} id="1" onClick={() => setModalActive(true)}>1</div>
      <div className={styles.table} id="2" onClick={() => setModalActive(true)}>2</div>
      <div className={styles.table} id="3" onClick={() => setModalActive(true)}>3</div>
      <div className={styles.table} id="4" onClick={() => setModalActive(true)}>4</div>
      <div className={styles.table} id="5" onClick={() => setModalActive(true)}>5</div>
      <div className={styles.table} id="6" onClick={() => setModalActive(true)}>6</div>
      <div className={styles.table} id="7" onClick={() => setModalActive(true)}>7</div>
      <div className={styles.table} id="8" onClick={() => setModalActive(true)}>8</div>
      <div className={styles.table} id="9" onClick={() => setModalActive(true)}>9</div>
      <div className={styles.table} id="10" onClick={() => setModalActive(true)}>10</div>
      <div className={styles.modall}>
        <ModalWindow active={modalActive} setActive={setModalActive}/>
      </div>
    </div>
  );
};


const blue = {
  backgroundColor: 'rgba(0, 153, 255, 0.6)'
}

const red = {
  backgroundColor: 'rgba(204, 0, 0, 0.6)'
}

const Button = styled.button`
border: none;
font-family: Montserrat;
font-style: normal;
font-weight: 300;
font-size: 36px;
line-height: 44px;
color: rgba(2, 65, 107, 0.9);
`
/*<GreenTableDiv className={styles.table}>1</GreenTableDiv>
const TableDiv = styled.button`display: flex;
        margin: 5px;
        position: absolute;
        justify-content: center;
        align-items: center;
        border: 2px solid rgba(0, 153, 255, 0.6);
        width: 70px;
        height: 140px;
        top: 150px;
        left: 75px;
font-family: Montserrat;
font-style: normal;
font-weight: 300;
font-size: 36px;
line-height: 44px;
color: rgba(2, 65, 107, 0.9);`

const GreenTableDiv = styled(TableDiv)`
        background-color: rgba(0, 102, 0, 0.6);
        `



/*const TableDi = styled.div`
        display: flex;
        margin: 5px;
        position: absolute;
        justify-content: center;
        align-items: center;
        border: 2px solid rgba(0, 153, 255, 0.6);
        `


{/*<div className={styles.table}><button key={1} >1</button></div>
      <div className={styles.table}><button key={2} >2</button></div>
      <div className={styles.table}><button key={3} >3</button></div>
      <div className={styles.table}><button key={4} >4</button></div>
      <div className={styles.table}><button key={5} >5</button></div>
      <div className={styles.table}><button key={6} >6</button></div>
      <div className={styles.table}><button key={7} >7</button></div>
      <div className={styles.table}><button key={8} >8</button></div>
      <div className={styles.table}><button key={9} >9</button></div>
      <div className={styles.table}><button key={10} >10</button></div>*/