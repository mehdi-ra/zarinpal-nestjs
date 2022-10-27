import * as _ from 'lodash';
import { ZarinPal } from 'src/core';
import { ZarinPalErrorCode } from 'src/interfaces';

export abstract class ZarinPalError {
  constructor(protected code: number) {}

  /**
   * This method search's for the error in constants.
   * @param statusCode Income status code from request.
   */
  private lookForError(statusCode: number) {
    try {
      const error: ZarinPalErrorCode | undefined = _.find(
        ZarinPal.statusCodes,
        { code: statusCode },
      );
      if (!error) {
        throw new Error(`Error with code ${statusCode} not found !`);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
