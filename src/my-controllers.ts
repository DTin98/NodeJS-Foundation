import {
  ArgumentMetadata,
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  PipeTransform,
  Post,
  Res,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsInt, IsString, validate } from 'class-validator';

//Use ParseIntPipe
@Controller('basic')
export class Basic {
  @Get(':id')
  getOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): number {
    return id;
  }
}

//Write a Parse Int PipeTransform
class MyParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value);
    if (isNaN(val)) {
      throw new BadRequestException('Validation Failed KAKA');
    }
    return val;
  }
}
@Controller('custom-parseint-pipe')
export class CustomParseUuid {
  @Get(':id')
  getOne(@Param('id', new MyParseIntPipe()) id: number): number {
    return id;
  }
}
class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
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
class createCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
@Controller('cats')
export class CatsController {
  @Post()
  create(@Body(new ValidationPipe()) createCatDto: createCatDto): createCatDto {
    return createCatDto;
  }
}
