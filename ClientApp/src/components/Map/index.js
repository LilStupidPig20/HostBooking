import React from "react";
import styles from "./map.module.css";
export const Map = () => {
  const getTable = (count) => {
    let template = [];
    for (let i = 0; i <= count; i++) {
      template.push(
        <div key={i} className={styles.table}>
          Стол {i + 1}
        </div>
      );
    }
    return template;
  };
  return (
    <div className={styles.map}>
      <div>{getTable(5)}</div>
    </div>
  );
};
