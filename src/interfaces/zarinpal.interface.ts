export interface ZarinPalRequestResult {
  status: number;

  /**
   * Json data including Transaction extra information
   * like Payment Gate type and time.
   *
   * example:
   * "{"authority": "000000000000000000000000234234", "Amount": "100", "Channel": "WebGate", "Date": "..."}"
   */
  authorities: string;
}
