// item.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    
    @PrimaryGeneratedColumn() // column which will be auto generated
    id: number; 
    
    @Column()
    title: string;

    @Column()
    amount: number;

    @Column()
    price: number;

    @Column({
        nullable: true
    })
    contactMobileNo: string;
}