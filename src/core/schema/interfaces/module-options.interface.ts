import { ZarinpalSupportedCurrencies } from './zarinpal.interface';

export interface ZarinpalModuleOptions {
  currency?: ZarinpalSupportedCurrencies;
  sandboxMode?: boolean;
  callBackUrl: string;
  merchantId: string;
}
