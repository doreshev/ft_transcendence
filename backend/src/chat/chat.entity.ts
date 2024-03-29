import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";

export enum ChatType {
    PUBLIC = "public",
    PRIVATE = "private",
    PROTECTED = "protected",
    DIRECT = "direct",
};

@Entity({name: 'chat'})
export class Chat {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({nullable: true})
    password: string;

    @Column({type: 'enum', enum: ChatType, default: [ChatType.PUBLIC]})
    type: ChatType;

    @Column("text", {array: true, default: null, nullable: true})
    admins: string[];

    @Column("text", {array: true, default: null, nullable: true})
    bannedUsers: string[];

    @Column("text", {array: true, default: null, nullable: true})
    mutedUsers: string[];

    @Column("text", {nullable: true})
    owner: string;

    @Column("text", {array: true, default: null, nullable: true})
    users: string[];

    @Column("text", {array: true, default: null, nullable: true})
    messages: string[];
}