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
                  elem.style = green;
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


const green = {
  backgroundColor: 'rgba(0, 102, 0, 0.6)'
}

const red = {
  backgroundColor: 'rgba(204, 0, 0, 0.6)'
}