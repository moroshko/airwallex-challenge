// Source: https://emailregex.com/
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const initialState = {
  fullName: "",
  fullNameError: null,
  email: "",
  emailError: null,
  confirmEmail: "",
  confirmEmailError: null,
  isSending: false,
  serverError: null
};

function reducer(state, action) {
  switch (action.type) {
    case "update-input": {
      return {
        ...state,
        [action.key]: action.value
      };
    }

    case "submit": {
      const fullNameError =
        state.fullName.trim().length >= 3
          ? null
          : "Must be at least 3 characters long";
      const emailError = emailRegex.test(state.email.trim())
        ? null
        : "Must be a valid email format";
      const confirmEmailError =
        state.confirmEmail.trim() === state.email.trim()
          ? null
          : "Must match the email above";
      const isSending = !fullNameError && !emailError && !confirmEmailError;

      return {
        ...state,
        fullNameError,
        emailError,
        confirmEmailError,
        serverError: null,
        isSending
      };
    }

    case "error": {
      return {
        ...state,
        isSending: false,
        serverError: action.serverError
      };
    }

    default: {
      return state;
    }
  }
}

export { reducer, initialState };
