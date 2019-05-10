import React from "react";
import useModal from "./hooks/useModal";
import Button from "./shared/Button";
import RequestInviteForm from "./RequestInviteForm";
import AllDoneForm from "./AllDoneForm";
import styles from "./Main.module.css";

function Main() {
  const [
    RequestInviteModal,
    { open: openRequestInvite, close: closeRequestInvite }
  ] = useModal();
  const [AllDoneModal, { open: openAllDone, close: closeAllDone }] = useModal();

  return (
    <main className={styles.main}>
      <div className={styles.primary}>A better way to enjoy every day.</div>
      <div className={styles.secondary}>
        Be the first to know when we launch.
      </div>
      <div className={styles.button}>
        <Button size="large" onClick={openRequestInvite}>
          Request an invite
        </Button>
        <RequestInviteModal title="Request an invite">
          <RequestInviteForm
            onSuccess={() => {
              closeRequestInvite();
              openAllDone();
            }}
          />
        </RequestInviteModal>
        <AllDoneModal title="All done!">
          <AllDoneForm onOK={closeAllDone} />
        </AllDoneModal>
      </div>
    </main>
  );
}

export default Main;
