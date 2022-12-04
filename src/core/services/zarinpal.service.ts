import { Inject, Injectable, Logger } from '@nestjs/common';
import { ZarinpalProvidersKey } from '../../core/constants/providers.const';

import {
  ZarinpalOpenTransactionOptions,
  ZarinpalVerifyTransactionOptions,
  ZarinpalSupportedCurrencies,
  ZarinpalRequestResult,
  ZarinpalRequestResultData,
  ZarinpalVerifyResultData,
} from '../../core/schema/interfaces/zarinpal.interface';

import { ZarinpalError } from '../../utilities';
import { ZarinpalHttpClientService } from './zarinpal-http';

@Injectable()
export class ZarinpalService {
  // ----------------------------------------------------------Constructor|
  constructor(
    @Inject(ZarinpalProvidersKey.CALLBACK_URL)
    private readonly callbackUrl: string,

    @Inject(ZarinpalProvidersKey.MERCHANT_ID)
    private readonly merchantId: string,

    @Inject(ZarinpalProvidersKey.CURRENCY)
    private readonly currency: ZarinpalSupportedCurrencies,

    @Inject(ZarinpalProvidersKey.LOGGER)
    private readonly logger: Logger,

    @Inject(ZarinpalProvidersKey.TRANSACTION_START_URL)
    private readonly startUrl: string,

    private readonly httpService: ZarinpalHttpClientService,
  ) {}

  /**
   * Open transaction on database after you pass data
   * @param {ZarinpalOpenTransactionOptions} options
   * @return {Readonly<ZarinpalRequestResultData>} Zarinpal request result.
   */
  public async openTransaction(
    options: ZarinpalOpenTransactionOptions,
  ): Promise<Readonly<ZarinpalRequestResultData>> {
    try {
      if (!options.callback_url) {
        options.callback_url = this.callbackUrl;
      }

      if (!options.merchant_id) {
        options.merchant_id = this.merchantId;
      }

      if (!options.currency) {
        options.currency = this.currency;
      }

      return await this.httpService.openTransaction(options);
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
   * @deprecated Will be removed in version 2 use `verifyTransaction()` instead.
   */
  public async verifyRequest(
    verifyOptions: ZarinpalVerifyTransactionOptions,
  ): Promise<Readonly<ZarinpalVerifyResultData>> {
    try {
      if (!verifyOptions.merchant_id) {
        verifyOptions.merchant_id = this.merchantId;
      }

      return await this.httpService.verifyTransaction(verifyOptions);
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
   * a certain amount of time.s
   * @param {ZarinpalVerifyTransactionOptions} options
   * @return {ZarinpalVerifyTransactionResultData}
   */
  public async verifyTransaction(
    options: ZarinpalVerifyTransactionOptions,
  ): Promise<Readonly<ZarinpalVerifyResultData>> {
    try {
      if (!options.merchant_id) {
        options.merchant_id = this.merchantId;
      }

      return await this.httpService.verifyTransaction(options);
    } catch (e) {
      throw this.errorHandler(e);
    }
  }

  // ------------------------------------------------------- Private methods|

  /**
   * Generate url using Zarinpal Request Result
   * @param {ZarinpalOpenTransactionResultData} result
   * @returns { string }
   */
  public generateStartPayUrl(result: ZarinpalRequestResultData): string {
    return this.startUrl.replace(':Authority', result.authority);
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
