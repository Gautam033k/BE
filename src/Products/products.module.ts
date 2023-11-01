import { Module } from "@nestjs/common";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { MProduct } from "./Entity/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports:[TypeOrmModule.forFeature([MProduct])],
    controllers:[ProductController],
    providers:[ProductService]
})
export  class ProductModule{}