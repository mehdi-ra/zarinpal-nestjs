import { ZarinpalService } from './services/zarinpal.service';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ZarinpalModuleOptions } from 'src/core/schema/interfaces';
import { ZarinpalProvidersKey } from './constants/providers.const';
import { ZarinPal } from './constants';
import { SoapModule } from 'nestjs-soap';

@Module({})
export class ZarinpalModule {
  static forRoot(options: ZarinpalModuleOptions): DynamicModule {
    return {
      imports: [
        SoapModule.register({
          clientName: ZarinpalProvidersKey.SOAP_CLIENT,
          uri: ZarinPal.zarinpalSoapServer,
        }),
      ],
      controllers: [],
      module: ZarinpalModule,
      providers: [
        ZarinpalService,

        {
          provide: ZarinpalProvidersKey.CALLBACK_URL,
          useValue: options.callBackUrl,
        },

        {
          provide: ZarinpalProvidersKey.SOAP_SERVER_URL,
          useValue: ZarinPal.zarinpalSoapServer,
        },

        {
          provide: ZarinpalProvidersKey.API_KEY,
          useValue: options.apiKey,
        },

        {
          provide: ZarinpalProvidersKey.LOGGER,
          useValue: new Logger('Zarinpal-payment'),
        },
      ],
    };
  }
}
