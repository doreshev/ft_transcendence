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
import {GameService} from "./game.service";
import {GameDataDto} from "./dto/game-data.dto";
import {JoinGameDto} from "./dto/join-game.dto";
import {GameScoreDto} from "./dto/game-score.dto";


@WebSocketGateway(Number(process.env.GAME_PORT) | 5002, {
    namespace: "game",
    transports: ["websocket"],
    cors: {	origin: '*' },
})

export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server : Server;

    constructor(private readonly gameService: GameService) {}

    @SubscribeMessage('gameUpdate')
    gameUpdate(@MessageBody() dto: GameDataDto,
               @ConnectedSocket() client: Socket) {
        if (this.gameService.isPlayer(client.id)) {
            const gameId = this.gameService.getGameId(client.id);
            if (gameId)
                this.server.to(String(gameId)).emit('gameUpdate', dto);
        }
    }

    afterInit(server: Server) {}

    handleConnection() {}

    handleDisconnect(@ConnectedSocket() client: Socket) {
        if (this.gameService.isPlayer(client.id)) {
            const gameId = this.gameService.getGameId(client.id);
            if (this.gameService.isStarted(gameId))
                this.server.to(String(gameId)).emit("playerDisconnected", gameId);
            else {
                this.gameService.deletePlayer(client.id);
                this.gameService.deleteGame(gameId);
            }
            client.leave(String(gameId));
        }
    }

    @SubscribeMessage('join')
    async handleJoin(
        @ConnectedSocket() client: Socket,
        @MessageBody() dto : JoinGameDto
    ) : Promise<void> {
        const status = await this.gameService.joinGame(client.id, dto);
        client.join(String(dto.gameId));
        this.server.to(String(dto.gameId)).emit(status, dto.gameId);
    }

    @SubscribeMessage('end')
    gameEnd(
        @ConnectedSocket() client: Socket,
        @MessageBody() dto : GameScoreDto
    ) : void {
        const isEnded = this.gameService.endOfGame(client.id, dto);
        if (isEnded)
            this.server.to(String(dto.gameId)).emit('finished', dto.gameId);
        client.leave(String(dto.gameId));
    }

    @SubscribeMessage('leave')
    leaveGame(
        @ConnectedSocket() client: Socket,
        @MessageBody() dto : GameScoreDto
    ) : void {
        const isEnded = this.gameService.endOfGame(client.id, dto);
        if (isEnded)
            this.server.to(String(dto.gameId)).emit('finished', dto.gameId);
        client.leave(String(dto.gameId));
    }
}