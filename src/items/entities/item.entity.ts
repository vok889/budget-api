// item.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum ItemStatus {
    PENDING = 'PENDING', APPROVED = 'APPROVED', REJECTED = 'REJECTED'
  }
@Entity()
export class Item {
    
    @PrimaryGeneratedColumn() // column which will be auto generated
    id: number; 
    
    @Column()
    title: string;
        
    @Column()
    description: string;

    @Column()
    amount: number;

    @Column()
    price: number;

    @Column({
        name:"contact_mobile_no", // add
        nullable: true
    })
    contactMobileNo: string;

    @Column({
        nullable: false,
        default: ItemStatus.PENDING
    })
    status: ItemStatus
}