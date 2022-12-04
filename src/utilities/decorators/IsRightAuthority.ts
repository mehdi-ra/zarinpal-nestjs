import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from '@nestjs/class-validator';

import { checkAuthorityCode } from './isRightAuthority.fn';

export function IsRightAuthority(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLongerThan',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return checkAuthorityCode(value);
        },
      },
    });
  };
}
