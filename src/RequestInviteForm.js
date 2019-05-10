import React, { useReducer, useEffect } from "react";
import Button from "./shared/Button";
import Input from "./shared/Input";
import InputError from "./shared/InputError";
import { reducer, initialState } from "./requestInviteReducer";
import { requestInvite } from "./api";
import styles from "./RequestInviteForm.module.css";

function RequestInviteForm({ onSuccess }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateInput = key => value => {
    dispatch({
      type: "update-input",
      key,
      value
    });
  };
  const onSubmit = event => {
    event.preventDefault();

    dispatch({
      type: "submit"
    });
  };

  useEffect(() => {
    let cancelRequest;

    if (state.isSending) {
      cancelRequest = requestInvite(
        { name: state.fullName, email: state.email },
        onSuccess,
        serverError => {
          // If the modal is closed before the response is received,
          // this function is still called with serverError being undefined.
          // There is no point to dispatch an error in this case since
          // the modal is not visible anymore.
          if (serverError) {
            dispatch({
              type: "error",
              serverError
            });
          }
        }
      );
    }

    return () => {
      cancelRequest && cancelRequest();
    };
  }, [state.isSending, state.fullName, state.email, onSuccess]);

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.fullNameInput}>
        <Input
          type="text"
          value={state.fullName}
          onChange={updateInput("fullName")}
          placeholder="Full name"
          fullWidth={true}
          hasError={state.fullNameError !== null}
        />
        <InputError message={state.fullNameError} />
      </div>
      <div className={styles.emailInput}>
        <Input
          type="email"
          value={state.email}
          onChange={updateInput("email")}
          placeholder="Email"
          fullWidth={true}
          hasError={state.emailError !== null}
        />
        <InputError message={state.emailError} />
      </div>
      <div className={styles.confirmEmailInput}>
        <Input
          type="email"
          value={state.confirmEmail}
          onChange={updateInput("confirmEmail")}
          placeholder="Confirm email"
          fullWidth={true}
          hasError={state.confirmEmailError !== null}
        />
        <InputError message={state.confirmEmailError} />
      </div>
      <div className={styles.sendButton}>
        <Button
          type="submit"
          size="large"
          disabled={state.isSending}
          fullWidth={true}
        >
          {state.isSending ? "Sending, please wait..." : "Send"}
        </Button>
        <div className={styles.serverError}>{state.serverError}</div>
      </div>
    </form>
  );
}

export default RequestInviteForm;
