import { Inject, Injectable } from '@nestjs/common';
import { ZarinpalProvidersKey } from '../constants';

import axios from 'axios';
@Injectable()
export class HttpClientService {
  constructor(
    @Inject(ZarinpalProvidersKey.TRANSACTION_OPEN_URL)
    private readonly transactionOpenUrl: string,

    @Inject(ZarinpalProvidersKey.AXIOS_TOKEN)
    private readonly Axios: typeof axios,
  ) {}

  public async openTransaction(options?: any): Promise<any> {
    try {
      console.log(await this.Axios.post(''));
      return { data: 1 };
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
