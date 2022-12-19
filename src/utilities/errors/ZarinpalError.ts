import * as _ from 'lodash';

import { ZarinPal } from '../../core';
import { ZarinpalErrorCode } from '../../core/schema/interfaces';

export class ZarinpalError extends Error {
  /**
   * Http status code that is
   * suitable to income request error.
   */
  public statusCode!: number;

  constructor(public code: number, public validationErrors?: unknown[]) {
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
        this.message = `Error with code ${statusCode} not found !`;
        return;
      }

      this.message = error.message;
      this.statusCode = error.httpStatusCode;
      this.name = error.status.toString();
    } catch (e) {
      this.message = (e as unknown) as string;
      this.statusCode = 500;
    }
  }
}
