import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {UserService} from "./user.service";
import {UserInfoDto} from "./dto/user-info.dto";


@WebSocketGateway(Number(process.env.SOCKET_PORT), {
    namespace: "user",
    cors: {	origin: '*' },
})
export class UserGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly userService: UserService) {}

    afterInit() {}

    handleConnection() {}

    async handleDisconnect(@ConnectedSocket() client: Socket) {
        await this.userService.userDisconnect(client.id);
    }

    @SubscribeMessage('userConnect')
    async newUser(
        @ConnectedSocket() client: Socket,
        @MessageBody() dto : UserInfoDto
    ): Promise<void> {
        if (dto && dto.userId) {
            await this.userService.userConnect(client.id, dto);
        }
    }

    @SubscribeMessage('userUpdate')
    userUpdate(@ConnectedSocket() client: Socket) {
        if (this.userService.isConnected(client.id)) {
            this.server.emit('userUpdate');
        }
    }
}
