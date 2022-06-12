export class HandledError {
  public message: ErrorMessages;
  public resolution?: string | undefined;
  public responseStatus?: number | undefined;

  constructor(message: ErrorMessages, resolution?: string | undefined, responseStatus?: number | undefined) {
    this.message = message;
    this.resolution = resolution;
    responseStatus == undefined ? 500 : this.responseStatus = responseStatus;
  }
}

export const enum ErrorMessages {
  LoginUserNotFound = "login error.",
  DBIncoherenceError = "incoherence error.",
  DBError = "internal database error.",
  ServerError = "internal server error.",
  RequestBodyError = "error parsing request body.",
  UnexpectedError = "unexpected error",
}

export const isError = (
  toBeDetermined: any | HandledError
): toBeDetermined is HandledError => {
  return !!(toBeDetermined as HandledError)?.message;
};
