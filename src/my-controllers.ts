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
import { Response } from 'express';
import { Params } from 'express-serve-static-core';

//ParseIntPipe
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
      throw new BadRequestException('Validation Failed HIHI');
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


class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    throw new Error('Method not implemented.');
  }
}
