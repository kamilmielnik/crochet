export const initialState = {
  id: undefined,
  crochetId: undefined,
  name: undefined
};

export default {
  generate(id, crochetId, name) {
    return {
      ...initialState,
      id,
      crochetId,
      name
    };
  }
};
