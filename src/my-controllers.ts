import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Params } from 'express-serve-static-core';

//Basic Controller
@Controller('basic') //another way: '/basic'
export class Basic {
  @Get() //another way: '/'
  getString(): string {
    return 'this is basic controller';
  }
}

//Manage Response Myself Controller
//This approach have some disadvantage. This is much less clear. -> different res in each request
//*property passthrough ?

@Controller('plain-response')
export class PlainResponse {
  @Get()
  @HttpCode(400)
  getString(@Res({ passthrough: true }) res: Response) {
    res.send('this is plain response controller');
    console.log(res);
  }
}

//Wildcards Controller
@Controller('wildcards*')
export class Wildcards {
  @Get()
  getString(): string {
    return 'this is wildcards controller';
  }
}

//Status Code Controller
@Controller('status400')
export class Status400 {
  @HttpCode(400) //When I swap between httpcode and get method, this still work
  @Get()
  getString(): string {
    return 'this is status 400 controller';
  }
}

//Set Header Controller
@Controller('set-header')
export class SetHeader {
  @Get()
  @Header('status', 'ok')
  getString(): string {
    return 'this is set header controller';
  }
}

//Get Params Controller
@Controller('get-params')
export class GetParams {
  @Get('/pick-param/:param1')
  getParam(@Param('param1') param1: string): string {
    return param1;
  }

  //o.O The Magic! O.o
  //*This will have sequence changeable when swap 2 method below?
  @Get(':param1')
  getParams(@Param() params: Params): Params {
    return params;
  }

  @Get('/pick-param')
  getString(): string {
    return 'string';
  }
}

//Async Controller
@Controller('async')
export class Async {
  @Get()
  async getString(): Promise<string> {
    const s: Promise<string> = new Promise((resolve, resject) => {
      setTimeout(() => {
        resolve('this is async controller');
      }, 10000);
    });

    // console.log('this is the first execution !');

    return s;
  }
}

//DTO is an object that defines how the data will be sent over the network
//*Should use classes to define DTO than the interface -> Why?
//*Why data not mapping to CreateCatDTO when got a body from request client?

class CreateCatDto {
  name: string;
  age: string;
}
@Controller('create-cat')
export class CreateCat {
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCatDto: CreateCatDto): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(createCatDto);
      }, 200);
    });
  }
}

//This is reason that Java is better TypeScript
//-> Java even check type after app running on complied source.
// But TS not check
