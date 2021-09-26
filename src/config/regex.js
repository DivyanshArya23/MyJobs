const REGEX = {
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  FULL_NAME: /^[\s]*([A-Za-z]+)+(([\s])([A-Za-z]+)){1,2}([\s]*)$/,
  SINGLENAME: /^[a-zA-Z]+[\s]*$/,
};

export { REGEX };
