export interface ZarinPalRequestResult {
  /**
   * The status code that returned after sending request.
   */
  status: number;

  /**
   * Json data including Transaction extra information
   * like Payment Gate type and time.
   */
  authorities: string;
}
