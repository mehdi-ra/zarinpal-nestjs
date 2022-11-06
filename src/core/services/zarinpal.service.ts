import { Inject, Injectable, Logger } from '@nestjs/common';
import { ZarinpalProvidersKey } from '../../core/constants/providers.const';

/**
 * This class mostly used as Error handler
 * Do not implement any complex functionality here!
 */

import {
  ZarinpalRequestResult,
  ZarinpalOpenTransactionOptions,
  ZarinpalVerifyTransactionOptions,
} from '../../core/schema/interfaces/zarinpal.interface';

import { ZarinpalError } from '../../utilities';
import { ZarinpalAxiosClientService } from './zarinpal-http';

@Injectable()
export class ZarinpalService {
  // ----------------------------------------------------------Constructor|
  constructor(
    @Inject(ZarinpalProvidersKey.CALLBACK_URL)
    private readonly callbackUrl: string,

    @Inject(ZarinpalProvidersKey.LOGGER)
    private readonly logger: Logger,

    @Inject(ZarinpalProvidersKey.TRANSACTION_START_URL)
    private readonly startUrl: string,

    private readonly httpService: ZarinpalAxiosClientService,
  ) {}

  /**
   * Open transaction on database after you pass data
   * @param {ZarinpalOpenTransactionOptions} options
   * @return {string} Redirect url
   */
  public async openTransaction(
    options: ZarinpalOpenTransactionOptions,
  ): Promise<string> {
    try {
      if (!options.callback_url) {
        options.callback_url = this.callbackUrl;
      }

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

  // ------------------------------------------------------- Private methods|

  private generateStartPayUrl(result: ZarinpalRequestResult): string {
    return this.startUrl.replace(':Authority', result.data.authority);
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
