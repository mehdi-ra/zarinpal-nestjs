import { ZarinpalErrorCode, ZarinPalURL } from 'src/interfaces';

export namespace ZarinPal {
  export const zarinpalSoapServer: ZarinPalURL =
    'https://zarinpal.com/pg/services/WebGate/wsdl';

  export const zarinpalStartPay: ZarinPalURL =
    'https://zarinpal.com/pg/StartPay/:Authority/ZarinGate';

  export const zarinpalStartPayZarinGate: ZarinPalURL =
    'https://zarinpal.com/pg/StartPay/:Authority/ZarinGate';

  /**
   * This urls used in type ZarinpalURLS
   * but you can use them as you whish
   */
  export const urls = [
    'https://zarinpal.com/pg/StartPay/:Authority',
    'https://zarinpal.com/pg/services/WebGate/wsdl',
    'https://zarinpal.com/pg/StartPay/:Authority/ZarinGate',
  ] as const;

  export const statusCodes: ZarinpalErrorCode[] = [
    { status: -1, message: 'اطلاعات ارسال شده ناقص است.', httpStatusCode: 400 },
    {
      status: -2,
      message: 'آیپی یا مرچنت کد پذیرنده صحیح نیست.',
      httpStatusCode: 400,
    },
    {
      status: -3,
      message:
        'با توجه به محدودیت‌ها، امکان پرداخت با رقم درخواست شده میسر نیست..',
      httpStatusCode: 406,
    },
    {
      status: -4,
      message: 'سطح تایید پذیرنده کم تر از سطح نقره ای است.',
      httpStatusCode: 405,
    },
    { status: -11, message: 'درخواست مورد نظر یافت نشد.', httpStatusCode: 404 },
    {
      status: -12,
      message: 'امکان ویرایش درخواست میسر نمی‌باشد.',
      httpStatusCode: 406,
    },
    {
      status: -21,
      message: 'هیچ نوع عملیات مالی برای این تراکنش یافت.',
      httpStatusCode: 404,
    },
    { status: -22, message: 'تراکنش ناموفق می‌باشد.', httpStatusCode: 400 },
    {
      status: -33,
      message: 'رقم تراکنش با رقم پرداخت شده مطابقت ندارد.',
      httpStatusCode: 409,
    },
    {
      status: -34,
      message: 'سقف تقسیم تراکنش از لحاظ تعداد یا رقم عبور نموده است.',
      httpStatusCode: 500,
    },
    {
      status: -40,
      message: 'اجازه دسترسی به متد مربوطه وجود ندارد.',
      httpStatusCode: 405,
    },
    {
      status: -41,
      message: 'اطلاعات ارسال شده مربوط به AdditionalData غیر معتبراست.',
      httpStatusCode: 400,
    },
    {
      status: -42,
      message: 'مدت زمان معتبر طول عمر پرداخت باید بین 30 تا 45 روز میباشد.',
      httpStatusCode: 400,
    },
    {
      status: -54,
      message: 'درخواست مورد نظر آرشیو شده است.',
      httpStatusCode: 405,
    },
    { status: 100, message: 'عملیات با موفقیت انجام شد.', httpStatusCode: 200 },
    {
      status: 101,
      message: 'عملیات موفق بوده و قبلا Verify شده است.',
      httpStatusCode: 200,
    },
  ];
}
