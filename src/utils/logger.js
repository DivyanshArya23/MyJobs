/* eslint-disable no-console */
const logger = {
  warn: (...props) => {
    console.warn(...props);
  },

  info: (...props) => {
    console.info(...props);
  },

  log: (...props) => {
    console.log(...props);
  },

  error: (...props) => {
    console.error(...props);
  },
};

module.exports = logger;
