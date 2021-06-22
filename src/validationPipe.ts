import {
  ArgumentMetadata,
  NotAcceptableException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private validatorOptions = null;
  constructor(validatorOptions: ValidatorOptions) {
    this.validatorOptions = validatorOptions;
  }
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, this.validatorOptions);
    if (errors.length > 0) {
      throw new NotAcceptableException(errors);
    }
    return value;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
