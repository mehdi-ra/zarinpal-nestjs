import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { ZarinpalModuleOptions } from '../../core/schema/interfaces';

import ModuleProviderFactory from './providers';
import ModuleImportFactory from './imports';

import { ZarinpalAxiosClientService, ZarinpalService } from '../services';
import { ZarinpalProvidersKey } from '../constants';

@Global()
@Module({})
export class ZarinpalModule {
  static register(options: ZarinpalModuleOptions): DynamicModule {
    return {
      module: ZarinpalModule,
      imports: ModuleImportFactory(),
      providers: ModuleProviderFactory(options),
      exports: [ZarinpalService, ZarinpalAxiosClientService],
      global: true,
    };
  }
}
