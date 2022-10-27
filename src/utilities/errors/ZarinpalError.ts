import * as _ from 'lodash';
import { ZarinPal } from 'src/core';
import { ZarinpalErrorCode } from 'src/interfaces';

export abstract class ZarinpalError {
  constructor(protected code: number) {}

  /**
   * This method search's for the error in constants.
   * @param statusCode Income status code from request.
   */
  private lookForError(statusCode: number) {
    try {
      const error: ZarinpalErrorCode | undefined = _.find(
        ZarinPal.statusCodes,
        { status: statusCode },
      );
      if (!error) {
        throw new Error(`Error with code ${statusCode} not found !`);
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
