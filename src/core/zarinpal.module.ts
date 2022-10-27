import { ZarinPalService } from '../services/zarinpal.service';
import { DynamicModule, Module } from '@nestjs/common';
import { ZarinPalOptions } from 'src/interfaces';
import { ZarinPalProvidersKey } from './constants/providers.const';
import { ZarinPal } from './constants';
import { SoapModule } from 'nestjs-soap';

@Module({})
export class ZarinPalModule {
  static forRoot(options: ZarinPalOptions): DynamicModule {
    return {
      imports: [
        SoapModule.register({
          clientName: ZarinPalProvidersKey.SOAP_CLIENT,
          uri: ZarinPal.zarinpalSoapServer,
        }),
      ],
      controllers: [],
      module: ZarinPalModule,
      providers: [
        ZarinPalService,

        {
          provide: ZarinPalProvidersKey.CALLBACK_URL,
          useValue: options.callBackUrl,
        },

        {
          provide: ZarinPalProvidersKey.SOAP_SERVER_URL,
          useValue: ZarinPal.zarinpalSoapServer,
        },

        {
          provide: ZarinPalProvidersKey.API_KEY,
          useValue: options.apiKey,
        },
      ],
    };
  }
}
