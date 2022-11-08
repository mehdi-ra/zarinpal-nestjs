import { DynamicModule, Global, Module } from '@nestjs/common';
import { ZarinpalModuleOptions } from '../../core/schema/interfaces';

import ModuleProviderFactory from './providers';
import ModuleImportFactory from './imports';

import { ZarinpalHttpClientService, ZarinpalService } from '../services';

@Global()
@Module({})
export class ZarinpalModule {
  static register(options: ZarinpalModuleOptions): DynamicModule {
    return {
      module: ZarinpalModule,
      imports: ModuleImportFactory(),
      providers: ModuleProviderFactory(options),
      exports: [ZarinpalService, ZarinpalHttpClientService],
      global: true,
    };
  }
}
