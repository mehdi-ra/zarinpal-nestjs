import { Inject, Injectable, Logger } from '@nestjs/common';
import { ZarinpalProvidersKey } from 'src/core/constants/providers.const';
import {
  ZarinpalRequestOptions,
  ZarinpalRequestResult,
} from 'src/interfaces/zarinpal.interface';
import { SoapClientService } from './soapclient.service';

@Injectable()
export class ZarinpalService {
  constructor(
    @Inject(ZarinpalProvidersKey.CALLBACK_URL)
    private readonly callbackUrl: string,

    @Inject(ZarinpalProvidersKey.LOGGER)
    private readonly logger: Logger,

    private soapService: SoapClientService,
  ) {}

  public async openTransaction(
    options: ZarinpalRequestOptions,
  ): Promise<ZarinpalRequestResult> {
    
    try {
      const requestResult = this.soapService.sendRequest(options)
      
    }
  }

  public async verifyRequest() {}

  // ================================ Private methods|

  private parseJson() {}
  private generateLastCode() {}
  private generateRedirectUrl() {}
}
