import * as _ from 'lodash';

import { Logger } from '@nestjs/common';
import { ZarinPal } from 'src/core';
import { ZarinpalErrorCode } from 'src/interfaces';

export abstract class ZarinpalError {
  /**
   * String message returned from Zarinpal payment.
   */
  public message: string;

  /**
   * Http status code that is suitable to income request error.
   */
  public status: number;

  /**
   * Logger that every log in this class should be
   * outputted using this object.
   */
  protected logger = new Logger('Zarinpal Error');

  constructor(protected code: number) {
    this.lookForError(code);
  }

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

      this.message = error.message;
      this.status = error.httpStatusCode;

      this.logger.error(error.message + Date.now().toString());
    } catch (e) {
      
      this.message = e?.toString() || e;
      this.status = 500;

      this.logger.error(e);
    }
  }
}
