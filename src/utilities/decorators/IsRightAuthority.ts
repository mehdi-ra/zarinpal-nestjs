import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from '@nestjs/class-validator';

export function IsRightAuthority(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            typeof value === 'string' &&
            value.startsWith('A') &&
            value.length === 36
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
