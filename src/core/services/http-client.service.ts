import { Inject, Injectable } from '@nestjs/common';
import { ZarinpalProvidersKey } from '../constants';

import {
  ZarinpalOpenTransactionOptions,
  ZarinpalVerifyTransactionOptions,
  ZarinpalRequestResult,
  ZarinpalVerifyResult,
} from '../schema/interfaces';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class HttpClientService {
  constructor(
    @Inject(ZarinpalProvidersKey.TRANSACTION_OPEN_URL)
    private readonly transactionOpenUrl: string,

    @Inject(ZarinpalProvidersKey.TRANSACTION_VERIFY_URL)
    private readonly verifyUrl: string,

    @Inject(ZarinpalProvidersKey.AXIOS_TOKEN)
    private readonly Axios: typeof axios,
  ) {}

  /**
   * Send request to zarinpal API version 4
   * this will helps you to update something very important.
   * @param options {ZarinpalOpenTransactionOptions}
   * @return {Promise<ZarinpalRequestResult>}
   */
  public async openTransaction(
    options: ZarinpalOpenTransactionOptions,
  ): Promise<ZarinpalRequestResult> {
    try {
      const request = await this.sendRequest<ZarinpalRequestResult>(
        this.transactionOpenUrl,
        options,
      );

      return request.data;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Sending verify transaction to verify that you
   * receive the user payed transaction result.
   * @param options
   * @returns
   */
  public async verifyTransaction(
    options: ZarinpalVerifyTransactionOptions,
  ): Promise<ZarinpalVerifyResult> {
    try {
      const request = await this.sendRequest<ZarinpalVerifyResult>(
        this.verifyUrl,
        options,
      );

      return request.data;
    } catch (e) {
      throw e;
    }
  }

  // -----------------------------------------------PrivateMethods|

  private isValidResult(result: unknown) {
    if (
      result &&
      typeof result === 'object' &&
      ('Authorities' in result || 'Status' in result)
    ) {
      return true;
    }

    return false;
  }

  private parseJson(jsonData: string) {
    try {
      return JSON.parse(jsonData);
    } catch (e) {
      throw new Error('Error parsing JSON !');
    }
  }

  /**
   * Send post request to zarinpal API'S
   */
  private async sendRequest<R>(
    url: string,
    data: unknown,
  ): Promise<AxiosResponse<R, any>> {
    return this.Axios.post(url, data);
  }
}
