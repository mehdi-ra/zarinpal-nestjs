import { ZarinpalErrorCode, ZarinpalURLS } from '../../core/schema/interfaces';

export namespace ZarinPal {
  export const urls: ZarinpalURLS = {
    openTransaction: {
      default: 'https://api.zarinpal.com/pg/v4/payment/request.json',
      sandbox: 'https://sandbox.zarinpal.com/pg/v4/payment/request.json',
    },

    verifyTransaction: {
      default: 'https://api.zarinpal.com/pg/v4/payment/verify.json',
      sandbox: 'https://sandbox.zarinpal.com/pg/v4/payment/verify.json',
    },

    startPay: {
      default: 'https://www.zarinpal.com/pg/StartPay/:Authority',
      sandbox: 'https://sandbox.zarinpal.com/pg/StartPay/:Authority',
    },
  };

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
    {
      status: 101,
      message: 'عملیات موفق بوده و قبلا Verify شده است.',
      httpStatusCode: 200,
    },
    {
      status: -9,
      message: 'خطای اعتبار سنجی',
      httpStatusCode: 400,
    },
    {
      status: -10,
      message: 'ای پی و يا مرچنت كد پذيرنده صحيح نيست',
      httpStatusCode: 400,
    },

    {
      status: -11,
      message: 'مرچنت کد فعال نیست لطفا با تیم پشتیبانی ما تماس بگیرید',
      httpStatusCode: 500,
    },

    {
      status: -12,
      message: 'تلاش بیش از حد در یک بازه زمانی کوتاه.',
      httpStatusCode: 429,
    },

    {
      status: -15,
      message: 'ترمینال شما به حالت تعلیق در آمده با تیم پشتیبانی تماس بگیرید',
      httpStatusCode: 500,
    },

    {
      status: -16,
      message: 'سطح تاييد پذيرنده پايين تر از سطح نقره اي است.',
      httpStatusCode: 406,
    },

    { status: 100, message: 'عملیات با موفقیت انجام شد.', httpStatusCode: 200 },

    {
      status: -30,
      message: 'اجازه دسترسی به تسویه اشتراکی شناور ندارید',
      httpStatusCode: 405,
    },

    {
      status: -31,
      message:
        'حساب بانکی تسویه را به پنل اضافه کنید مقادیر وارد شده واسه تسهیم درست نیست',
      httpStatusCode: 400,
    },

    {
      status: -33,
      message: 'درصد های وارد شده درست نیست',
      httpStatusCode: 400,
    },

    {
      status: -34,
      message: 'مبلغ از کل تراکنش بیشتر است',
      httpStatusCode: 400,
    },

    {
      status: -50,
      message: 'مبلغ پرداخت شده با مقدار مبلغ در وریفای متفاوت است',
      httpStatusCode: 400,
    },

    { status: -51, message: 'پرداخت ناموفق', httpStatusCode: 400 },

    {
      status: -52,
      message: 'خطای غیر منتظره با پشتیبانی تماس بگیرید',
      httpStatusCode: 500,
    },

    {
      status: -53,
      message: 'اتوریتی برای این مرچنت کد نیست',
      httpStatusCode: 400,
    },

    { status: -54, message: 'اتوریتی نامعتبر است', httpStatusCode: 400 },
    { status: 101, message: 'تراکنش وریفای شده', httpStatusCode: 200 },
  ];

  export const requestHeaders: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };
}
