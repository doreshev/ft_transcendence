import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import {User, UserStatus} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,) {
    }

    async createUser(dto: UserDTO): Promise<User> {
        if (!dto.email || !dto.displayName)
            throw new HttpException('Required information was not provided!', HttpStatus.BAD_REQUEST);
        const existingUser = await this.userRepository.findOneBy({email: dto.email});
        if (existingUser)
            return existingUser;
        const user = this.userRepository.create(dto);
        user.pendingFriends = [];
        user.bannedUsers = [];
        user.friends = [];
        user.messages = [];
        user.chats = [];
        user.matchHistory = [];
        return this.userRepository.save(user);
    }

    //Geting User
    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async findByEmail(userEmail: string): Promise<User> {
        const user = await this.userRepository.findOneBy({email: userEmail});
        if (!user)
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        return user;
    }

    async findById(userId: number): Promise<User> {
        const user = await this.userRepository.findOneBy({id: userId});
        if (!user)
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        return user;
    }

    async remove(userId: number) : Promise<void> {
        await this.userRepository.delete(userId);
    }

    //USER INFO
    changePhoto(user : User, newPhoto : string) : void {
        user.photo = newPhoto;
        this.userRepository.save(user);
    }

    changeStatus(user : User, newStatus : UserStatus) : void {
        user.status = newStatus;
        this.userRepository.save(user);
    }

    //MESSAGES

    addMessage(messageId: number, user : User) : void {
        user.messages.push(messageId);
        this.userRepository.save(user);
    }

    deleteMessage(messageId: number, user : User) : void {
        user.messages = user.messages.filter((message) => message != messageId);
        this.userRepository.save(user);
    }

    //FRIEND LIST
    acceptFriendRequest(user : User, friend : User) : void {
        if (user.pendingFriends.includes(friend.id)) {
            user.friends.push(friend.id);
            friend.friends.push(user.id);
            user.pendingFriends = user.pendingFriends.filter((id) => id !== friend.id);
            this.userRepository.save(user);
            this.userRepository.save(friend);
        }
    }

    declineFriendRequest(user : User, request : User) : void {
        if (user.pendingFriends.includes(request.id)) {
            user.pendingFriends = user.pendingFriends.filter((id) => id !== request.id);
            this.userRepository.save(user);
        }
    }

    deleteFriend(user : User, friend : User) : void {
        if (user.friends.includes(friend.id)) {
            user.friends = user.friends.filter((id) => id !== friend.id);
            friend.friends = friend.friends.filter((id) => id !== user.id);
            this.userRepository.save(user);
            this.userRepository.save(friend);
        }
    }

    sendFriendRequest(user : User, friend : User) : void {
        if (friend.bannedUsers.includes(user.id) || user.friends.includes(friend.id))
            return;

        if (!friend.pendingFriends.includes(user.id)) {
            friend.pendingFriends.push(user.id);
            this.userRepository.save(friend);
        }
    }

    //Black List
    banUser(user : User, userToBan : User) : void {
        if (!user.bannedUsers.includes(userToBan.id)) {
            if (user.friends.includes(userToBan.id)) {
                user.friends = user.friends.filter((friend) => friend !== userToBan.id);
                userToBan.friends = user.friends.filter((friend) => friend !== user.id);
                this.userRepository.save(userToBan);
            }
            user.bannedUsers.push(userToBan.id);
            this.userRepository.save(user);
        }
    }

    unbanUser(user : User, userToUnban : User) : void {
        if (user.bannedUsers.includes(userToUnban.id)) {
            user.bannedUsers = user.bannedUsers.filter((banneduser) => banneduser !== userToUnban.id);
            this.userRepository.save(user);
        }
    }

    //GAME
    wonGame(user : User, matchId : number) : void {
        user.matchHistory.push(matchId);
        user.wins += 1;
        user.score += 3;
        this.userRepository.save(user);
    }

    draw(user : User, matchId : number) : void {
        user.matchHistory.push(matchId);
        user.draws += 1;
        user.score += 1;
        this.userRepository.save(user);
    }

    lostGame(user : User, matchId : number) : void {
        user.matchHistory.push(matchId);
        user.losses += 1;
        this.userRepository.save(user);
    }

    //CHAT
    addChat (user : User, chat : number) : void {
        if (!user.chats.includes(chat)) {
            user.chats.push(chat);
            this.userRepository.save(user);
        }
    }

    deleteChat (user : User, chat : number) : void {
        user.chats = user.chats.filter(chatId => chatId !== chat);
        this.userRepository.save(user);
    }
}