import { Test } from '@nestjs/testing';
import { fakeModuleOptions } from './fake/module-options';
import { HttpClientService } from '../core/services/http-client.service';

import ModuleImportsFactory from 'src/core/module/imports';
import ModuleProvidersFactory from 'src/core/module/providers';

describe('HttpClientService', () => {
  let service!: HttpClientService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      // imports: ModuleImportsFactory(),
      providers: ModuleProvidersFactory(fakeModuleOptions),
    }).compile();

    service = moduleRef.get(HttpClientService);
  });

  test('Kon', async () => {
    const result = await service.openTransaction({
      options: fakeModuleOptions,
    });
    expect(result).toBe(1);
  });
});
