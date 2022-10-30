import { Inject, Injectable, Logger } from '@nestjs/common';
import { ZarinPal, ZarinpalProvidersKey } from 'src/core';
import { Client } from 'nestjs-soap';
import {
  ZarinpalRequestOptions,
  ZarinpalRequestResult,
  ZarinPalURL,
} from 'src/core/schema/interfaces/zarinpal.interface';
import { ZarinpalError } from 'src/utilities';

@Injectable()
export class SoapClientService {
  constructor(
    @Inject(ZarinpalProvidersKey.SOAP_CLIENT) private readonly _client: Client,
  ) {}

  /**
   * Client injected from NestJs Soap module.
   */
  public get client(): Client {
    return this._client;
  }

  /**
   * Open Transaction on zarinpal soap api.
   * This method
   * @param data {Omit<ZarinpalRequestOptions, 'GateWay'>}
   */
  public async sendOpenTransactionRequest(
    data: Omit<ZarinpalRequestOptions, 'GateWay'>,
  ) {
    try {
      const requestResult = await this.request(data);

      if (!this.isValidResult(requestResult)) {
        throw new Error('Request result is not valid.');
      } else if (
        this.isValidResult(requestResult) &&
        requestResult.Status !== 100
      ) {
        throw new ZarinpalError(requestResult.Status);
      }
      return requestResult;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Verify transaction after user done the payment
   * process and then there is nothing.
   */
  public async verifyTransaction(data: unknown) {
    const requestResult = await this.request(data);
  }

  // ---------------------------------------- Private methods|

  /**
   * Send request with request.
   * @param data Sending request using nestjs
   */
  private async request<T extends ZarinpalRequestResult>(
    data: unknown,
  ): Promise<T> {
    try {
      return await this.parseJson(this.client.ZPSendRequestAsync(data));
    } catch (e) {
      throw new Error('Error in parsing income result to JSON !');
    }
  }

  /**
   * Check if income result from request
   * Is valid.
   */
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
    return JSON.parse(jsonData);
  }
}
