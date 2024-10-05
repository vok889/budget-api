import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidationArguments } from "class-validator";
const isNumberMesssage = (validationArguments: ValidationArguments): string => {
    return `${validationArguments.property}: ต้องเป็นตัวเลข`
  }
export class CreateItemDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    // #1 style
    @IsNumber({},{message: isNumberMesssage})
    @IsNotEmpty()
    amount: number;
    
    // #2 style
    @IsNumber({},{message: (v)=>(`${v.property} ควรเป็นตัวเลขเท่านั้น`)})
    @IsNotEmpty()
    price: number;

    @IsOptional()
    contactMobileNo: string;
}
