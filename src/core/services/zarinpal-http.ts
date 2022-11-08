import { Inject, Injectable } from '@nestjs/common';
import { ZarinpalError } from '../../utilities';
import { ZarinpalProvidersKey } from '../constants';
import { Headers } from 'node-fetch';

import {
  ZarinpalOpenTransactionOptions,
  ZarinpalVerifyTransactionOptions,
  ZarinpalRequestResult,
  ZarinpalVerifyResult,
  fetchType,
} from '../schema/interfaces';

@Injectable()
export class ZarinpalHttpClientService {
  constructor(
    @Inject(ZarinpalProvidersKey.TRANSACTION_OPEN_URL)
    private readonly transactionOpenUrl: string,

    @Inject(ZarinpalProvidersKey.TRANSACTION_VERIFY_URL)
    private readonly verifyUrl: string,

    @Inject(ZarinpalProvidersKey.HTTP_HELPER)
    private readonly fetch: fetchType,
  ) {}

  /**
   * Send request to zarinpal API version 4
   * this will helps you to update something very important.
   * @param options {ZarinpalOpenTransactionOptions}
   * @return {Promise<ZarinpalRequestResult>}
   */
  public async openTransaction(
    options: ZarinpalOpenTransactionOptions,
  ): Promise<ZarinpalRequestResult['data']> {
    try {
      const request = await this.sendRequest<ZarinpalRequestResult>(
        this.transactionOpenUrl,
        options,
      );

      if (request.errors && request.errors.code < 0) {
        throw new ZarinpalError(request.errors.code);
      }

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
  ): Promise<ZarinpalVerifyResult['data']> {
    try {
      const request = await this.sendRequest<ZarinpalVerifyResult>(
        this.verifyUrl,
        options,
      );

      if (request.errors) {
        throw new ZarinpalError(request.errors.code);
      }

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

  private getHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  /**
   * Send post request to zarinpal API'S
   */
  private async sendRequest<R>(url: string, data: unknown): Promise<R> {
    try {
      const response = await this.fetch(url, {
        method: 'post',
        body: JSON.stringify(data),
        headers: this.getHeaders(),
      });

      return await response.json();
    } catch (e) {
      throw e;
    }
  }
}
