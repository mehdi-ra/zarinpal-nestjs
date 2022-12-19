import { ZarinpalSupportedCurrencies } from './zarinpal.interface';

export interface ZarinpalModuleOptions {
  /**
   * Default is 'IRR', the currency of amount that you
   * pass to create transaction method.
   * - IRR = `ریال`;
   * - IRT = `تومان`;
   */
  currency?: ZarinpalSupportedCurrencies;

  /**
   * If you pass true then base urls will be changed with
   * a sandbox prefix. This feature is not working for now
   * and it's better to leave it alone.
   */
  sandboxMode?: boolean;

  /**
   * This will encodes every income authority code
   * from long string of (A00000000000000000000000000387664294)
   * to something like (26x387664294) and conversely.
   */
  encode?: boolean;

  /**
   * After payment is done, Zarinpal redirects
   * users to this url and then you will return
   * to this url. If you are on development mode
   * and server is running on localhost use something
   * like: `http://localhost:3000/payment/callback`.
   */
  callBackUrl: string;

  /**
   * Merchant ID that you get after registering to
   * zarinpal.com
   */
  merchantId: string;
}
