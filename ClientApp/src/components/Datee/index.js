import React, { useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import styles from './date.module.css';
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

export function Datee(props) {
    let date = props.date;
    return (
        <div className={styles.date}>
            <span className={styles.text}>Выбранная дата:&nbsp;</span>{
            <DatePicker
                wrapperClassName={styles.datePickerrr}
                className={styles.datePicker}
                dateFormat="dd.MM.yy"
                locale={"ru"}
                selected={props.date}
                onChange={(date) => props.setDate(date)}
            />
            }<span className={styles.orange}>,&nbsp;{new Intl.DateTimeFormat('ru-RU', { weekday: 'short'}).format(props.date)}</span></div>
    );
};