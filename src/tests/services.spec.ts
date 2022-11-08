import { Test } from '@nestjs/testing';
import { fakeModuleOptions } from './mock/module-options';
import ModuleImportsFactory from '../core/module/imports';
import ModuleProvidersFactory from '../core/module/providers';

import { ZarinpalProvidersKey } from '../core';
import { ZarinpalService } from '../core/services/zarinpal.service';

describe('ZarinpalService', () => {
  let service!: ZarinpalService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: ModuleImportsFactory(),
      providers: ModuleProvidersFactory(fakeModuleOptions),
    })
      .useMocker(token => {
        if (token === ZarinpalProvidersKey.HTTP_HELPER) {
          return async function() {
            return {
              data: {
                data: {},
              },
            };
          };
        }
      })
      .compile();

    service = moduleRef.get(ZarinpalService);
  });

  test('Generate StartPay url', async () => {
    const result = await service.openTransaction({
      amount: 1000,
      merchant_id: '1344b5d4-0048-11e8-94db-005056a205be',
      callback_url: 'https://fileniko.com',
      description: 'Hello everyone',
    });
    expect(result).toBe('https://www.zarinpal.com/pg/StartPay/monaliza');
  });

  test('Verify result', async () => {
    const verifyResult = await service.verifyRequest({
      amount: 1000,
      authority: 'monaliza',
      merchant_id: '1344b5d4-0048-11e8-94db-005056a205bej',
    });
  });
});
