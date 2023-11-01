import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class ProductDto{
@IsNotEmpty()
@IsString()
@Length(3,200)
title:string;

@IsNotEmpty()
@IsString()
id:string;

@IsNotEmpty()
@IsNumber()
@Length(2)
price:number;

}