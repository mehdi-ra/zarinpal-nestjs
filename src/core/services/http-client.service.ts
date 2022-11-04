import { Inject, Injectable } from '@nestjs/common';
import { ZarinpalProvidersKey } from '../constants';

@Injectable()
export class HttpClientService {
  constructor(
    @Inject(ZarinpalProvidersKey.TRANSACTION_OPEN_URL)
    private readonly transactionOpenUrl: string,
  ) {}

  public async openTransaction(options?: any): Promise<any> {
    try {
      const requestResult = await fetch(this.transactionOpenUrl, {
        body: options,
      });
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
}
