import * as _ from 'lodash';

import { ZarinPal } from '../../core';
import { ZarinpalErrorCode } from '../../core/schema/interfaces';

export class ZarinpalError extends Error {
  /**
   * Http status code that is suitable to income request error.
   */
  public statusCode!: number;

  /**
   * Logger that every log in this class should be
   * outputted using this object.
   */

  constructor(public code: number) {
    super();
    this.lookForError(code);
  }

  /**
   * This method search's for the error in constants.
   * @param statusCode Income status code from request.
   */
  private lookForError(statusCode?: number) {
    try {
      const error: ZarinpalErrorCode | undefined = _.find(
        ZarinPal.statusCodes,
        { status: statusCode },
      );

      if (!error) {
        throw new Error(`Error with code ${statusCode} not found !`);
      }

      this.message = error.message;
      this.statusCode = error.httpStatusCode;
      this.name = error.status.toString(); // Set name of error
    } catch (e) {
      this.message = (e as unknown) as string;
      this.statusCode = 500;
    }
  }
}
