import { Logger, Provider } from '@nestjs/common';
import { generateUrl } from '../../utilities/factories/url-factory';
import { ZarinpalProvidersKey } from '../constants';
import { ZarinpalModuleOptions } from '../schema/interfaces';

// import axios from 'axios';
import fetch from 'node-fetch';
import { ZarinpalHttpClientService, ZarinpalService } from '../services';

export default (function(options: ZarinpalModuleOptions): Provider[] {
  return [
    ZarinpalHttpClientService,
    ZarinpalService,

    {
      provide: ZarinpalProvidersKey.CURRENCY,
      useValue: options?.currency || 'IRR',
    },

    {
      provide: ZarinpalProvidersKey.LOGGER,
      useValue: new Logger('Zarinpal-Payment'),
    },

    {
      provide: ZarinpalProvidersKey.HTTP_HELPER,
      useValue: fetch,
    },

    { provide: ZarinpalProvidersKey.LOGGER, useValue: new Logger('Zarinpal') },

    {
      provide: ZarinpalProvidersKey.CALLBACK_URL,
      useValue: options.callBackUrl,
    },

    {
      provide: ZarinpalProvidersKey.MERCHANT_ID,
      useValue: options.merchantId,
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
