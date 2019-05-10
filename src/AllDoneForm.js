import React from "react";
import Button from "./shared/Button";
import styles from "./AllDoneForm.module.css";

function AllDoneForm({ onOK }) {
  const onSubmit = event => {
    event.preventDefault();
    onOK();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.text}>
        You will be one of the first to experience Broccoli &amp; Co. when we
        launch.
      </div>
      <div className={styles.okButton}>
        <Button type="submit" size="large" fullWidth={true}>
          OK
        </Button>
      </div>
    </form>
  );
}

export default AllDoneForm;
