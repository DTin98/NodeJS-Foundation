import { IsInt, IsString } from 'class-validator';

export class createCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}
