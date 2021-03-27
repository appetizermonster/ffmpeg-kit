export class Log {
  #sessionId;
  #level;
  #message;

  constructor(sessionId, level, message) {
    this.#sessionId = sessionId;
    this.#level = level;
    this.#message = message;
  }

  getSessionId() {
    return this.#sessionId;
  }

  getLevel() {
    return this.#level;
  }

  getMessage() {
    return this.#message;
  }

}
