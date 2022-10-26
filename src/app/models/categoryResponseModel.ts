import { Category } from "./category";
import { ResponseModel } from "./responseModel";

export interface ProductResponseModel extends ResponseModel{
    data:Category[],

}