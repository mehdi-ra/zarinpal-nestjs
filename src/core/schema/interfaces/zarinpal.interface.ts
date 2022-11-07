import fetch from 'node-fetch';

/**
 * Request option when you are sending request
 * to Zarinpal in first time or when you want to
 * open unfinished or not payed transaction on Zarinpal
 * servers.
 */
export interface ZarinpalOpenTransactionOptions {
  merchantId?: string;
  amount: number;
  description?: string;
  callback_url?: string;
  metadata?: ZarinpalOpenRequestMetadata;
}
export interface ZarinpalResultErrors {
  errors?: {
    code: number;
    message: string;
    validators?: [{ [key: string]: string }];
  };
}
export interface ZarinpalRequestResult extends ZarinpalResultErrors {
  data: {
    code: number;
    message: string;
    authority: string;
    fee_type: 'Merchant';
    fee: number;
  };
}

export interface ZarinpalVerifyResult extends ZarinpalResultErrors {
  data: {
    code: number;
    message: string;
    card_hash: string;
    card_pan: string;
    ref_id: number;
    fee_type: string;
    fee: number;
  };
}

export interface ZarinpalOpenRequestMetadata {
  email?: string;
  mobile?: string;
  card_pan?: string;
}

export interface ZarinpalVerifyTransactionOptions {
  merchantId: string;
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
  openTransaction: ZarinpalURL;
  verifyTransaction: ZarinpalURL;
  startPay: ZarinpalURL;
}

export type fetchType = typeof fetch;
