import { ZarinpalService } from './services/zarinpal.service';
import { DynamicModule, Logger, Module } from '@nestjs/common';
import { ZarinpalModuleOptions } from 'src/core/schema/interfaces';
import { ZarinpalProvidersKey } from './constants/providers.const';
import { generateUrl } from 'src/utilities/factories/url-factory';

@Module({})
export class ZarinpalModule {
  static forRoot(options: ZarinpalModuleOptions): DynamicModule {
    return {
      imports: [],
      controllers: [],
      module: ZarinpalModule,
      providers: [
        ZarinpalService,

        {
          provide: ZarinpalProvidersKey.CALLBACK_URL,
          useValue: options.callBackUrl,
        },

        {
          provide: ZarinpalProvidersKey.MERCHANT_ID,
          useValue: options.merchantID,
        },

        {
          provide: ZarinpalProvidersKey.LOGGER,
          useValue: new Logger('Zarinpal-Payment'),
        },

        {
          provide: ZarinpalProvidersKey.SANDBOX_MODE,
          useValue: !!options.sandboxMode,
        },

        {
          provide: ZarinpalProvidersKey.TRANSACTION_OPEN_URL,
          useValue: generateUrl('openTransaction', options.sandboxMode),
        },

        {
          provide: ZarinpalProvidersKey.TRANSACTION_VERIFY_URL,
          useValue: generateUrl('verifyTransaction', options.sandboxMode),
        },

        {
          provide: ZarinpalProvidersKey.TRANSACTION_START_URL,
          useValue: generateUrl('startPay', options.sandboxMode),
        },
      ],
    };
  }
}
