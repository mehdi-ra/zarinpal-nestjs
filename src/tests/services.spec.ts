import { Test } from '@nestjs/testing';
import { fakeModuleOptions } from './mock/module-options';
import ModuleImportsFactory from 'src/core/module/imports';
import ModuleProvidersFactory from 'src/core/module/providers';

import { ZarinpalProvidersKey } from 'src/core';
import { ZarinpalService } from 'src/core/services/zarinpal.service';
import { mockAxiosFactory } from './mock/axios';

describe('ZarinpalService', () => {
  let service!: ZarinpalService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: ModuleImportsFactory(),
      providers: ModuleProvidersFactory(fakeModuleOptions),
    })
      .useMocker(token => {
        if (token === ZarinpalProvidersKey.AXIOS_TOKEN) {
          return mockAxiosFactory();
        }
      })
      .compile();

    service = moduleRef.get(ZarinpalService);
  });

  test('Sending request to update', async () => {
    const result = await service.openTransaction({
      amount: 1000,
      merchant_id: '1344b5d4-0048-11e8-94db-005056a205be',
      callback_url: 'https://fileniko.com',
      description: 'Hello everyone',
    });
    expect(result).toBe('https://www.zarinpal.com/pg/StartPay/monaliza');
  });
});
