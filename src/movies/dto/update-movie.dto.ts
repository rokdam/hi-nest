import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, isString, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

//createMovieDto와 같이 쓰고 타입이 필수가 아니게 지정만 할 수도 있지만, 부분타입(partial types)을 사용
export class UpdateMovieDto extends PartialType(CreateMovieDto){

}