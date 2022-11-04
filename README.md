# Zarinpal Adaptor for `NestJs`.
Use zarinpal payment features as easy as blink on Nestjs framework.
Do not use this package for your Business packages due to this package is under development and it's not tested properly.

## Goals
- Easy API.
- Support of simple transactions `(progressing)`.
- Very specific TypeOfError and error handling `(progressing)`.
- Support of Complex and multi level implementations transactions.

## How to use: (samples are fake and used as an abstraction)
---
### installation
Install is very simple 
Before anything you should get and install package from `npm`:
```
yarn add zarinpal-nestjs
// Or
npm install --save zarinpal-nestjs
```

### Module registration
After successful installation you need to register zarinpal-nestjs module in your NestJs application:

```
{
  imports: [
    ZarinpalModule.forRoot(options)
  ]
}
```
---

### Inject service | Define callback endpoint
Now it's time to define your callback endpoint to verify transaction after user completes it's transaction.

```
// Inside Controller.

constructor(private readonly zarinpalService: ZarinpalService) {}

@Get()
async verifyTransaction(@Body() body: ZarinpalTransactionDoneDto) {
  try {
    const zarinpalVerifyResult = await this.zarinpalService.verify(body);
    this.paymentService.updateTransaction(zarinpalVerifyResult); // This is sample
  }
  catch(e: unknown) {
    if(e && e instanceof ZarinpalError) {
      // This error includes the code and related income message
      // Do everything you like.
    }

    else {
      // Unknown error
    }
  }
}
```