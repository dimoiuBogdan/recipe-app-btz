class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // call the constructor of "Error" class
    this.code = errorCode;
  }
}

module.exports = HttpError;
