import { ZarinPal } from 'src/core';
import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import { ZarinpalProvidersKey } from 'src/core/constants/providers.const';

import {
  ZarinpalRequestResult,
  ZarinpalOpenTransactionOptions,
  ZarinpalVerifyTransactionOptions,
} from 'src/core/schema/interfaces/zarinpal.interface';
import { ZarinpalError } from 'src/utilities';
import { HttpClientService } from './http-client.service';

@Injectable()
export class ZarinpalService {
  // -----------------------------------Constructor|
  constructor(
    @Inject(ZarinpalProvidersKey.CALLBACK_URL)
    private readonly callbackUrl: string,

    @Inject(ZarinpalProvidersKey.LOGGER)
    private readonly logger: Logger,

    @Inject(ZarinpalProvidersKey.TRANSACTION_START_URL)
    private readonly startUrl: string,

    private readonly httpService: HttpClientService,
  ) {}

  /**
   * Open transaction on server and return databse
   * @param {ZarinpalOpenTransactionOptions} options
   * @return {string} Redirect url
   */
  public async openTransaction(
    options: ZarinpalOpenTransactionOptions,
  ): Promise<string> {
    try {
      // Setting callback_url
      options.callback_url = this.callbackUrl;

      const result = await this.httpService.openTransaction(options);
      return this.generateStartPayUrl(result);
    } catch (e) {
      throw this.errorHandler(e);
    }
  }

  /**
   * After you open a transaction using openTransaction,
   * You need to get income result from your callback endpoint
   * and use this method to confirm transaction.
   *
   * If not, Zarinpal will return the money back to user after
   * a certain amount of time.
   */
  public async verifyRequest(verifyOptions: ZarinpalVerifyTransactionOptions) {
    try {
      return await this.httpService.verifyTransaction(verifyOptions);
    } catch (e) {
      throw this.errorHandler(e);
    }
  }

  // ================================ Private methods|

  private generateStartPayUrl(data: ZarinpalRequestResult): string {
    return this.startUrl.replace(':Authority', data.authority.toString());
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
