import { Inject, Injectable } from '@nestjs/common';
import { ZarinPalProvidersKey } from 'src/core/constants/providers.const';

@Injectable()
export class ZarinPalService {
  constructor(
    @Inject(ZarinPalProvidersKey.CALLBACK_URL)
    private readonly callbackUrl: string,

    @Inject(ZarinPalProvidersKey.SOAP_SERVER_URL)
    private readonly SoapServerUrl: string,

    @Inject(ZarinPalProvidersKey.API_KEY)
    private readonly apiKey: string,
  ) {}

  public async sendRequest() {}
  public async verifyRequest() {}
}
