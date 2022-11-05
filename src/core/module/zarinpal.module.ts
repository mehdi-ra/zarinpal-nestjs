import { DynamicModule, Module } from '@nestjs/common';
import { ZarinpalModuleOptions } from 'src/core/schema/interfaces';

import ModuleProviderFactory from './providers';
import ModuleImportFactory from './imports';

@Module({})
export class ZarinpalModule {
  static forRoot(options: ZarinpalModuleOptions): DynamicModule {
    return {
      module: ZarinpalModule,
      imports: ModuleImportFactory(),
      providers: ModuleProviderFactory(options),
    };
  }
}
