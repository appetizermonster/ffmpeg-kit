export class Level {

  /**
   * This log level is used to specify logs printed to stderr by ffmpeg.
   * Logs that has this level are not filtered and always redirected.
   */
  static AV_LOG_STDERR = -16;

  /**
   * Print no output.
   */
  static AV_LOG_QUIET = -8;

  /**
   * Something went really wrong and we will crash now.
   */
  static AV_LOG_PANIC = 0;

  /**
   * Something went wrong and recovery is not possible.
   * For example, no header was found for a format which depends
   * on headers or an illegal combination of parameters is used.
   */
  static AV_LOG_FATAL = 8;

  /**
   * Something went wrong and cannot losslessly be recovered.
   * However, not all future data is affected.
   */
  static AV_LOG_ERROR = 16;

  /**
   * Something somehow does not look correct. This may or may not
   * lead to problems. An example would be the use of '-vstrict -2'.
   */
  static AV_LOG_WARNING = 24;

  /**
   * Standard information.
   */
  static AV_LOG_INFO = 32;

  /**
   * Detailed information.
   */
  static AV_LOG_VERBOSE = 40;

  /**
   * Stuff which is only useful for libav* developers.
   */
  static AV_LOG_DEBUG = 48;

  /**
   * Extremely verbose debugging, useful for libav* development.
   */
  static AV_LOG_TRACE = 56;

  /**
   * Returns log level string.
   *
   * @param level log level integer
   * @returns log level string
   */
  static levelToString(level) {
    switch (level) {
      case Level.AV_LOG_TRACE:
        return "TRACE";
      case Level.AV_LOG_DEBUG:
        return "DEBUG";
      case Level.AV_LOG_VERBOSE:
        return "VERBOSE";
      case Level.AV_LOG_INFO:
        return "INFO";
      case Level.AV_LOG_WARNING:
        return "WARNING";
      case Level.AV_LOG_ERROR:
        return "ERROR";
      case Level.AV_LOG_FATAL:
        return "FATAL";
      case Level.AV_LOG_PANIC:
        return "PANIC";
      case Level.AV_LOG_STDERR:
        return "STDERR";
      case Level.AV_LOG_QUIET:
      default:
        return "";
    }
  }

}
