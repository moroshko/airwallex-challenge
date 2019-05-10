import axios from "axios";

const REQUEST_INVITE_ENDPOINT =
  "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

function requestInvite(data, onSuccess, onError) {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  axios
    .post(REQUEST_INVITE_ENDPOINT, data, {
      cancelToken: source.token,
      validateStatus: status => status === 200 || status === 400 // then() will be called only if the status code is 200 or 400
    })
    .then(response => {
      if (response.status === 200) {
        onSuccess();
      } else {
        onError(response.data.errorMessage);
      }
    })
    .catch(error => {
      onError(error.message);
    });

  return source.cancel;
}

export { requestInvite };
