import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectRepository } from "@nestjs/typeorm";
import { MProduct } from "./Entity/product.entity";
import { Repository } from "typeorm";
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService{    

    constructor(
        @InjectRepository(MProduct)
        private productRepository:Repository<MProduct>
    ){}

    products: Product[]=[];
    async insertProduct(productDto:ProductDto) {
        // const prodId= Math.random().toString();
        // const newProduct = new Product(prodId,title,price)
        // this.products.push(newProduct);
           const {title,price} = productDto
        const data :MProduct={
            id:"123",
            title:title,
            price:price
        }

        await this.productRepository.save(data)
    
        return {
            statusCode:HttpStatus.OK,
            message:"sucess",
            title:title,
            price:price
        }
    }

    async getProducts(){

        const getProducts = await this.productRepository.find()
        return getProducts;
    }

    async getSingleProduct(productId:string){
        const product = await this.productRepository.findOne({where:{id:productId}});
        return {
           pro: product
        };
    }

    updateProduct(productId:string,title:string,price:number){
        const [product,index]= this.findProduct(productId)
        const updatedProduct = {...product};
        if(title){
            updatedProduct.title=title;
        }
        if(price){
            updatedProduct.price=price;
        }

        this.products[index]= updatedProduct;
    }

    deleteProduct(prodId:string){
        const index = this.findProduct(prodId)[1];
        this.products.splice(index,1);
    }

    private findProduct(id:string):[Product,number]{
        const productIndex = this.products.findIndex(prod=>prod.id === id)
        const product = this.products[productIndex]
        if(!product){
            throw new NotFoundException('Page not found')
        }
        return [product,productIndex];
    }
}