import { DynamicModule, Global, Logger, Module } from '@nestjs/common';
import { ZarinpalModuleOptions } from '../../core/schema/interfaces';

import ModuleProviderFactory from './providers';
import ModuleImportFactory from './imports';

import { ZarinpalAxiosClientService, ZarinpalService } from '../services';
import { ZarinpalProvidersKey } from '../constants';

import axios, { Axios } from 'axios';

@Global()
@Module({
  providers: [
    ZarinpalAxiosClientService,
    ZarinpalService,

    {
      provide: ZarinpalProvidersKey.LOGGER,
      useValue: new Logger('Zarinpal-Payment'),
    },
  ],
  exports: [ZarinpalService, ZarinpalAxiosClientService],
})
export class ZarinpalModule {
  static register(options: ZarinpalModuleOptions): DynamicModule {
    return {
      module: ZarinpalModule,
      imports: ModuleImportFactory(),
      providers: ModuleProviderFactory(options),
      global: true,
    };
  }
}
