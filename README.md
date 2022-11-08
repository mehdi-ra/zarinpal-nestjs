# Zarinpal Adaptor for `NestJs`.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

Use zarinpal payment features as easy as drinking water on Nestjs framework.
This version is usable on your services without any problem.


# Features:
- Easy to use.
- Light and fast.
- Any dependency to other zarinpal packages.
- Specific error type (ZarinpalError).

## How to use:
The process is very simple and includes:

- Open transaction on Zarinpal.
- Generate url using result and redirect user to startPay page.
- User will be redirected after payment is done to verify url you specified.

---

### installation
Installation is very simple and can be done using below commands:

```
yarn add zarinpal-nestjs // Or
npm install --save zarinpal-nestjs // Or
```

### Register the module
After successful installation you need to register zarinpal-nestjs module in your NestJs application:

```
@Module({
  imports: [
    ZarinpalModule.register({
      // Required options:
      callBackUrl: 'https://google.com',
      merchantId: '32 character long merchant_id',

      // Optional options:
      currency: 'IRR', // (IRR = ریال, IRT=تومان) default is IRR
      sandboxMode: false // default is false
    }),
  ],
})
export class AppModule {}

```
| name | Description |
|---   |---          |
| callBackUrl| url
---

### Inject `Zarinpal Service`.
The main functionality of the package are accessible from `ZarinpalService` importable from ZarinpalService.

```
import {
  ZarinpalError,
  ZarinpalService,
  ZarinpalVerifyQueryParams,
} from 'zarinpal-nestjs';


// Inside controller

@Controller('transaction')
export class AppController {
  constructor(
    private readonly zarinpalService: ZarinpalService,
    private transactionService: TransactionService,
  ) {}

  /**
  * This endpoint opens transaction and generates
  * start pay url and returns it. You need to redirect
  * user to this url. after user done the payment process
  * i will be redirected to url you registered on your Main module.
   */
  @Get('open')
  async openTransaction(): Promise<string> {
    try {
      const transactionResult = await this.zarinpalService.openTransaction({
        amount: 1000,
        description: 'Buying a car (example)',
      }); 

    // In real word, you need to store the result
    // Generate start pay url

    return this.zarinpalService.generateStartPayUrl(transactionResult);

    } catch (e) {
      if (e instanceof ZarinpalError) {
        throw new HttpException(e.message, e.status);
      }
      throw e;
    }
  }

  @Get('verify')
  async verifyTransaction(@Query() queryParams: ZarinpalVerifyQueryParams) {
    const transaction = this.transactionService.findByAuthority(
      queryParams.Authority,
    );

    if (queryParams.Status === 'OK') {
      return await this.zarinpalService.verifyRequest({
        authority: queryParams.Authority,
        amount: transaction.amount,
      });
    }

    else {
      throw new BadRequestException('پرداخت به دست کاربرلغو شده است');
    }
  }
}

```
