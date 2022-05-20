export class ErrorHanlder extends Error {
  constructor(error: Error) {
    super(error.message);
    console.log("here we go ", error.message);
  }
}
