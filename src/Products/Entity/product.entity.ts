import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Products')
export class MProduct{
    @PrimaryGeneratedColumn({
        comment:'The product is unique'
    })
    id:string;

    @Column({
        type:'text',
    })
    title:string;

    @Column({
        type:'text'
    })
    price:number
}