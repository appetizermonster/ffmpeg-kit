export class ReturnCode {

  static SUCCESS = 0;

  static CANCEL = 255;

  #value;

  constructor(value) {
    this.#value = value;
  }

  static isSuccess(returnCode) {
    return (returnCode !== undefined && returnCode.getValue() === ReturnCode.SUCCESS);
  }

  static isCancel(returnCode) {
    return (returnCode !== undefined && returnCode.getValue() === ReturnCode.CANCEL);
  }

  getValue() {
    return this.#value;
  }

  isValueSuccess() {
    return (this.#value === ReturnCode.SUCCESS);
  }

  isValueError() {
    return ((this.#value !== ReturnCode.SUCCESS) && (this.#value !== ReturnCode.CANCEL));
  }

  isValueCancel() {
    return (this.#value === ReturnCode.CANCEL);
  }

  toString() {
    return this.#value;
  }

}
