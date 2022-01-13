import React, { useState,useContext } from "react";
import { Map } from "../../components/Map";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import styles from "./booking.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Navbar } from "../../components/Navbar";
import { TableTimes } from "../../components/TableTimes";
import { Legend } from '../../components/Legend'
import { Datee } from '../../components/Datee'
import { TablesColors } from '../../data';



export const BookingPage = () => {
  const auth = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  let fullness = TablesColors(date);
  
  return (
    <div>
      <Navbar />
      <div className={styles.bookingContainer}>
        <div className={styles.bookingSide}>
          <div className={styles.dateSelector}>
            <Datee date={date} setDate={setDate}/>
          </div>
          <div className={styles.map}>
            <Map fullness={fullness}/>
          </div>
          <div className={styles.legend}>
            <Legend/>
          </div>
        </div>
        <div className={styles.modalContainer}>
          <div className={styles.sideMenu}>
            <div className={styles.tableTime}>
              <TableTimes />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
