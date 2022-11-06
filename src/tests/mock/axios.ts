export function mkAxios() {
  return {
    post: async () => {
      return {
        data: {
          data: {
            code: 100,
            message: 'Hello to you',
            authority: 'monaliza',
            card_hash: 'cardhashexample',
            card_pan: '9943453453453',
            ref_id: 400,
          },
        },
      };
    },
  };
}
