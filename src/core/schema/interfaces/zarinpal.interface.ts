import fetch from 'node-fetch';

/**
 * Request option when you are sending request
 * to Zarinpal in first time or when you want to
 * open unfinished or not payed transaction on Zarinpal
 * servers.
 */
export interface ZarinpalOpenTransactionOptions {
  amount: number;
  merchant_id?: string;
  description?: string;
  callback_url?: string;
  metadata?: ZarinpalOpenRequestMetadata;
  currency?: ZarinpalSupportedCurrencies;
}

export interface ZarinpalResultErrors {
  errors?: {
    code: number;
    message: string;
    validators?: [{ [key: string]: string }];
  };
}

export interface ZarinpalRequestResult extends ZarinpalResultErrors {
  data: Readonly<ZarinpalRequestResultData>;
}

export interface ZarinpalRequestResultData {
  fee: number;
  code: number;
  message: string;
  authority: string;
  fee_type: 'Merchant';
}

export interface ZarinpalVerifyResult extends ZarinpalResultErrors {
  data: Readonly<ZarinpalVerifyResultData>;
}

export interface ZarinpalVerifyResultData {
  fee: number;
  code: number;
  ref_id: number;
  message: string;
  card_pan: string;
  fee_type: string;
  card_hash: string;
}

export interface ZarinpalOpenRequestMetadata {
  email?: string;
  mobile?: string;
  card_pan?: string;
}

export interface ZarinpalVerifyTransactionOptions {
  merchant_id?: string;
  authority: string;
  amount: number;
}

/**
 * Useful when you want to help user to chose
 * urls and avoid unwanted mistakes.
 */
export interface ZarinpalURL {
  sandbox: string;
  default: string;
}

export interface ZarinpalURLS {
  verifyTransaction: ZarinpalURL;
  openTransaction: ZarinpalURL;
  startPay: ZarinpalURL;
}

export type fetchType = typeof fetch;
export type ZarinpalSupportedCurrencies = 'IRR' | 'IRT';
