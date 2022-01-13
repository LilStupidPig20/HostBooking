import React from "react";
import styles from "./map.module.css";
import styled from 'styled-components'

export const Map = (props) => {
    let fullness = Promise.resolve(props.fullness);
  
    let TableDiv = styled.div`
        display: flex;
        margin: 5px;
        position: absolute;
        justify-content: center;
        align-items: center;
        border: 2px solid rgba(0, 153, 255, 0.6);
        font-family: Montserrat;
        font-style: normal;
        font-weight: 300;
        font-size: 36px;
        line-height: 44px;
        color: rgba(2, 65, 107, 0.9);
        top: 150px;
        left: 75px;
        `;
    const GreenTableDiv = styled(TableDiv)`
      background-color: rgba(0, 102, 0, 0.6);
    `;
    const RedTableDiv = styled(TableDiv)`
      background-color: rgba(204, 0, 0, 0.6);
    `;
    const BlueTableDiv = styled(TableDiv)`
      background-color: rgba(0, 153, 255, 0.6);
    `;

    const printTables = (count) => {
      let template = [];
      fullness.then(function(v) {
      for(let k = 1; k < count; k++){
        switch(v[k]) {
          case 'FullFree': 
            console.log('смачный пердеж')
            template.push(<GreenTableDiv key={k}>{k}</GreenTableDiv>);
            break;

          case 'FullBusy':
            template.push(<RedTableDiv key={k}>{k}</RedTableDiv>);
            break;

          case 'PartiallyBusy':
            template.push(<BlueTableDiv key={k}>{k}</BlueTableDiv>);
            break;
        }
      }
      return template;
    })
    }
    
  return (
    <div className={styles.map}>
      {printTables(11)}
    </div>
  );
};




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