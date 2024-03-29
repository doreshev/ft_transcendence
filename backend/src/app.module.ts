import {Module} from "@nestjs/common";
import { UserModule } from './users/user.module';
import {User} from "./users/user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chat.module';
import { Chat } from "./chat/chat.entity";
import { AuthModule } from "./auth/auth.module";
import { Message } from "./chat/message/message.entity";
import { MessageModule } from "./chat/message/message.module";
import {Game} from "./game/game.entity";
import {GameModule} from "./game/game.module";
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    controllers: [],
    providers: [],
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, Chat, Message, Game],
            synchronize: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
        }),
        UserModule,
        ChatModule,
        AuthModule,
        MessageModule,
        GameModule,
    ],
})

export class AppModule {}