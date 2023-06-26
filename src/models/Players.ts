import { Entity, BaseEntity, Column, 
    PrimaryGeneratedColumn } from "typeorm";

@Entity("players")
export class Players extends BaseEntity {
    @PrimaryGeneratedColumn("uuid") id: string;
    @Column() first: string;
    @Column() last: string;
    @Column() age: number;
    @Column() info: string;
    @Column() image: string;;
};




