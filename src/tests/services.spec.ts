import { Test } from '@nestjs/testing';
import { fakeModuleOptions } from './mock/module-options';
import { HttpClientService } from '../core/services/http-client.service';
import ModuleImportsFactory from 'src/core/module/imports';
import ModuleProvidersFactory from 'src/core/module/providers';

import { ZarinpalProvidersKey } from 'src/core';

describe('HttpClientService', () => {
  let service!: HttpClientService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: ModuleImportsFactory(),
      providers: ModuleProvidersFactory(fakeModuleOptions),
    })
      .useMocker(token => {
        if (token === ZarinpalProvidersKey.AXIOS_TOKEN) {
          return {
            post: async () => {
              return {
                data: 1,
              };
            },
          };
        }
      })
      .compile();

    service = moduleRef.get(HttpClientService);
  });

  test('Sending request to update', async () => {
    const result = await service.openTransaction({
      options: fakeModuleOptions,
    });
    expect(result.data).toBe(1);
  });
});
