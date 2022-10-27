import { Inject, Injectable } from '@nestjs/common';
import { ZarinpalProvidersKey } from 'src/core/constants/providers.const';

@Injectable()
export class ZarinpalService {
  constructor(
    @Inject(ZarinpalProvidersKey.CALLBACK_URL)
    private readonly callbackUrl: string,

    @Inject(ZarinpalProvidersKey.SOAP_SERVER_URL)
    private readonly SoapServerUrl: string,

    @Inject(ZarinpalProvidersKey.API_KEY)
    private readonly apiKey: string,
  ) {}

  public async sendRequest() {}
  public async verifyRequest() {}
}
