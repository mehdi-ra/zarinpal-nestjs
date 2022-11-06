import { Inject, Injectable } from '@nestjs/common';
import { ZarinpalProvidersKey } from '../constants';

import axios, { AxiosResponse } from 'axios';
import {
  ZarinpalOpenTransactionOptions,
  ZarinpalRequestResult,
} from '../schema/interfaces';
@Injectable()
export class HttpClientService {
  constructor(
    @Inject(ZarinpalProvidersKey.TRANSACTION_OPEN_URL)
    private readonly transactionOpenUrl: string,

    @Inject(ZarinpalProvidersKey.AXIOS_TOKEN)
    private readonly Axios: typeof axios,
  ) {}

  public async openTransaction(
    options: ZarinpalOpenTransactionOptions,
  ): Promise<ZarinpalRequestResult> {
    try {
      const request = await this.sendRequest<
        ZarinpalOpenTransactionOptions,
        ZarinpalRequestResult
      >(this.transactionOpenUrl, options);

      request.data;

      return (await this.Axios.post(this.transactionOpenUrl, options)).data
        .data;
    } catch (e) {
      throw e;
    }
  }

  public async verifyTransaction(options?: any): Promise<any> {}

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
  private async sendRequest<T, R>(
    url: string,
    data: T,
  ): Promise<AxiosResponse<R, any>> {
    return this.Axios.post(url, data);
  }
}
