import { Body, Controller, Delete, Get, Param, Patch, Post, } from "@nestjs/common";
import { ProductService } from "./products.service";
import { ProductDto } from "./dto/product.dto";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    @Post('/add-product')
    async addProduct(
        @Body() productDto: ProductDto,
    ) {
        return await this.productService.insertProduct(
            productDto
        )
    }

    @Get('get-products')
    getAllProducts() {
        return this.productService.getProducts();
    }

    @Get('get-products/:id')
    getProduct(@Param('id') prodId: string) {
        return this.productService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodId: string, @Body('price') prodPrice: number, @Body('title') prodTitle: string) {
        this.productService.updateProduct(prodId, prodTitle, prodPrice)
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productService.deleteProduct(prodId);
        return null;
    }

}
