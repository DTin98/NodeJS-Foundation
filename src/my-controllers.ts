import { Controller, Get, Header, HttpCode, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Params } from 'express-serve-static-core';

//Basic Controller
@Controller('basic') //another way: '/basic'
export class BasicController {
  @Get() //another way: '/'
  getString(): string {
    return 'this is basic controller';
  }
}

//Manange Response Myself Controller
@Controller('plain-response')
export class PlainResponseController {
  @Get()
  getString(@Res() res: Response): Response<string> {
    return res.send('this is plain response controller');
  }
}

//Wildcards Controller
@Controller('wildcards*')
export class WildcardsController {
  @Get()
  getString(): string {
    return 'this is wildcards controller';
  }
}

//Status Code Controller
@Controller('status400')
export class Status400Controller {
  @HttpCode(400) //When I swap httpcode and method get this still work
  @Get()
  getString(): string {
    return 'this is status 400 controller';
  }
}

//Set Header Controller
@Controller('set-header')
export class SetHeaderController {
  @Get()
  @Header('status', 'ok')
  getString(): string {
    return 'this is set header controller';
  }
}

//Get Params Controller
@Controller('get-params')
export class GetParamsController {
  @Get('/pick-param/:param1')
  getParam(@Param('param1') param1: string): string {
    return param1;
  }

  //o.O The Magic! O.o
  //This will have sequence changeable when swap 2 method below?
  @Get(':param1')
  getParams(@Param() params: Params): Params {
    return params;
  }

  @Get('/pick-param')
  getString(): string {
    return 'string';
  }
}

//continue at Request Payload
