import React, { useState,useContext } from "react";
import { Map } from "../../components/Map";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import styles from "./booking.module.css";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { Navbar } from "../../components/Navbar";
registerLocale("ru", ru);

export const BookingPage = () => {
  const auth = useContext(AuthContext);

  const { loading, error, clearError, request } = useHttp();
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(date.getTime());
  const [endTime, setEndTime] = useState(date.getTime());

const testHandler= async ()=>{
  try {
    const data = await request("/api/table/login", "POST",{},{Authorization: `Bearer ${auth.token}`});
  } catch (error) {console.log(error)}
}

  return (
    <div>
      <Navbar />
      <div className={styles.bookingContainer}>
        
        <div className={styles.controlPanel}>
          Выберите дату
          <DatePicker
            dateFormat="dd.MM.yy"
            locale={"ru"}
            selected={date}
            onChange={(date) => setDate(date)}
          />
          Выберите время
          <DatePicker
            selected={startTime}
            onChange={(startTime)=>{setStartTime(startTime)}}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            timeFormat="HH:mm"
            dateFormat="HH:mm"
          />
          До скольки вы хотите забронировать
          <DatePicker
            selected={endTime}
            onChange={(endTime)=>{setEndTime(endTime)}}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            timeFormat="HH:mm"
            dateFormat="HH:mm"
          />
          <button className={styles.button}>Показать свободные столы</button>
          <button className={styles.buttonSubmit} onClick={testHandler}>Забронировать</button>
        </div>
        <div className={styles.bookingSide}>
          <div className={styles.map}>
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};
