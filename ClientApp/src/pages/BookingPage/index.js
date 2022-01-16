import React, { useState,useContext } from "react";
import { Map } from "../../components/Map";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import styles from "./booking.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from "../../components/Navbar";
import { Legend } from '../../components/Legend'
import { Datee } from '../../components/Datee'



export const BookingPage = () => {
  const [date, setDate] = useState(new Date());
  
  
  return (
    <div>
      <Navbar />
      <div className={styles.bookingContainer}>
        <div className={styles.bookingSide}>
          <div className={styles.dateSelector}>
            <Datee date={date} setDate={setDate}/>
          </div>
          <div className={styles.map}>
            <Map date={date}/>
          </div>
          <div className={styles.legend}>
            <Legend/>
          </div>
        </div>
        <div className={styles.modalContainer}>
          <div className={styles.sideMenu}>
            <span className={styles.textBlock}>Выберите стол для бронирования</span>
          </div>
        </div>
      </div>
    </div>
  );
};
