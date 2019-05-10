export default {
  post: jest.fn(() => Promise.resolve({ data: {} })),
  CancelToken: {
    source() {
      return {
        token: "foo",
        cancel() {}
      };
    }
  }
};
