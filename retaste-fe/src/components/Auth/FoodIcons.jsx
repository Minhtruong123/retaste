import React from "react";
import styles from "./AuthForm.module.css";

export default function FoodIcons() {
  return (
    <>
      <div className={styles.foodIcons}>
        <div className={styles.foodIcon}>Pizza</div>
        <div className={styles.foodIcon}>Burger</div>
        <div className={styles.foodIcon}>Salad</div>
        <div className={styles.foodIcon}>Drink</div>
      </div>
    </>
  );
}
