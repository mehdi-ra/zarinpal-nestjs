import { Logger } from '@nestjs/common';
import { generateUrl } from 'src/utilities/factories/url-factory';
import { ZarinpalProvidersKey } from '../constants';
import { ZarinpalModuleOptions } from '../schema/interfaces';
import { HttpClientService } from '../services/http-client.service';
import { ZarinpalService } from '../services/zarinpal.service';

export default (function(options: ZarinpalModuleOptions) {
  return [
    ZarinpalService,
    HttpClientService,

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
  ];
});
