import { ZarinPal } from 'src/core';
import { SoapClientService } from './soapclient.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ZarinpalProvidersKey } from 'src/core/constants/providers.const';

import {
  ZarinpalRequestResult,
  ZarinpalRequestOptions,
} from 'src/interfaces/zarinpal.interface';
import { ZarinpalError } from 'src/utilities';

@Injectable()
export class ZarinpalService {
  // -----------------------------------Constructor|
  constructor(
    @Inject(ZarinpalProvidersKey.CALLBACK_URL)
    private readonly callbackUrl: string,

    @Inject(ZarinpalProvidersKey.LOGGER)
    private readonly logger: Logger,

    private soapService: SoapClientService,
  ) {}

  /**
   * The purpose of this method is simple:
   * - Send and open transaction on zarinpal
   * - Get results, generate and return user start pay
   *   url. You should redirect user to this project.
   *
   * @param {ZarinpalRequestOptions} options
   * @return {string} Redirect url
   */
  public async openTransaction(
    options: ZarinpalRequestOptions,
  ): Promise<string> {
    try {
      const result = await this.soapService.sendOpenTransactionRequest(options);
      return this.generateRedirectUrl(result);
    } catch (e) {
      throw this.errorHandler(e);
    }
  }

  public async verifyRequest() {}

  // ================================ Private methods|

  private parseJson() {}
  private generateLastCode() {}

  /**
   * Generate url to update
   */
  private generateRedirectUrl(
    data: ZarinpalRequestResult,
    gate?: boolean,
  ): string {
    return !!gate
      ? ZarinPal.zarinpalStartPayZarinGate
      : ZarinPal.zarinpalStartPay.replace(
          ':Authority',
          data.Authorities.toString(),
        );
  }

  /**
   * Handle collected errors from
   * @return {Error}
   */
  private errorHandler(e: unknown): Error {
    if (
      e instanceof ZarinpalError ||
      e instanceof Error ||
      e instanceof TypeError
    ) {
      this.logger.error(`${e.message}`);
      return e;
    } else if (typeof e === 'string') {
      this.logger.error(e);
      return new Error(e);
    } else if (typeof e === 'undefined' || !e) {
      this.logger.error(`Undefined error trowed in ${this.constructor.name}`);
      return new Error(`Undefined error trowed in ${this.constructor.name}`);
    } else {
      this.logger.error(
        `Problem in detecting typeof error at ${this.constructor.name}`,
      );
      return new TypeError(
        `Problem in detecting typeof error at ${this.constructor.name}`,
      );
    }
  }
}
