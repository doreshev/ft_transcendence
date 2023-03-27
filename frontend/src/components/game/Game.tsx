import React, { useState, useEffect, useRef } from 'react';
import {io, Socket} from "socket.io-client";


interface Paddle {
    x: number;
    y: number;
    width: number;
    height: number;
    dy: number;
}

interface Ball {
    x: number;
    y: number;
    width: number;
    height: number;
    resetting: boolean;
    dx: number;
    dy: number;
}

interface Players {
    firstPlayer : string
    firstScore : number
    secondPlayer : string
    secondScore : number
}

interface GameData {
    leftPaddle : Paddle;
    rightPaddle : Paddle;
    maxPaddleY : number;
    ball : Ball;
    players : Players;
    timer : number;
    paddleSpeed :number;
}



function PingPong(): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    const [socket, setSocket] = useState<Socket>();
    // const [gameData, setGameData] = useState<GameData>();
    var newSocket : Socket;

    const gameDataUpdate = (data : GameData) => {
        socket?.emit("gameDataUpdate", data);
        console.log(data.players.firstScore);
    }

    useEffect(() => {
        newSocket = io("http://localhost:5002/game");
        setSocket(newSocket);
    }, []);

    let gameData : GameData = {
        leftPaddle  : { x: 0, y: 0, width: 0, height: 0, dy: 0 },
        rightPaddle : { x: 0, y: 0, width: 0, height: 0, dy: 0 },
        maxPaddleY  : 0,
        ball : { x: 0, y: 0, width: 0, height: 0, resetting: false, dx: 0, dy: 0 },
        players : { firstPlayer : "", firstScore : 0, secondPlayer : "", secondScore : 0 },
        timer : 0,
        paddleSpeed : 6
    }

    useEffect(() => {
        const canvas = canvasRef.current!;
        let timer = 0;
        const context = canvas.getContext('2d')!;
        const grid = 15;
        const paddleHeight = grid * 5; // 80
        const maxPaddleY = canvas.height - grid - paddleHeight;
        
        let paddleSpeed = 6;
        let ballSpeed = 3;
        let players : Players = {
            firstPlayer : "",
            firstScore : 0,
            secondPlayer : "",
            secondScore : 0
        };
        
        gameData = {
            leftPaddle : {
                x: grid * 2,
                y: canvas.height / 2 - paddleHeight / 2,
                width: grid,
                height: paddleHeight,
                dy: 0,
            },
            rightPaddle : {
                x: canvas.width - grid * 3,
                y: canvas.height / 2 - paddleHeight / 2,
                width: grid,
                height: paddleHeight,
                dy: 0,
            },
            maxPaddleY : canvas.height - grid - paddleHeight,
            ball : {
                x: canvas.width / 2,
                y: canvas.height / 2,
                width: grid,
                height: grid,
                resetting: false,
                dx: ballSpeed,
                dy: -ballSpeed,
            },
            players : {
                firstPlayer : "",
                firstScore : 0,
                secondPlayer : "",
                secondScore : 0
            },
            timer : 0,
            paddleSpeed : 6
        }
        gameDataUpdate(gameData);
        
        
        
        setInterval(() => {
            timer++;
        }, 1000);
        
        const drawNet = () => {
            context.beginPath();
            context.setLineDash([7, 15]);
            context.moveTo(canvas.width / 2, 20);
            context.lineTo(canvas.width / 2, canvas.height);
            context.strokeStyle = 'black';
            context.lineWidth = 2;
            context.stroke();
        };

        const drawPaddle = (paddle: Paddle) => {
            context.fillStyle = 'black';
            context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        };
        const drawBall = (ball: Ball) => {
            context.fillStyle = 'black';
            context.fillRect(ball.x, ball.y, ball.width, ball.height);
        };

        const drawTimer = () => {
            context.font = "bold 18px Arial";
            context.fillStyle = "black";
            const x = 360;
            const y= 15;
            context.fillText("Time: " + timer, x, y);
        };

        const drawScore = (players: Players) => {
            context.font = "bold 18px Arial";
            context.fillStyle = "black";
            const x1 = 10;
            const x2 = 650;
            const y= 20;
            context.fillText("Player 1: " + players.firstScore, x1, y);
            context.fillText("Player 2: " + players.secondScore, x2, y);
        };

        const moveBall = () => {
            if (gameData.ball.resetting) {
                gameData.ball.x = canvas.width / 2;
                gameData.ball.y = canvas.height / 2;
                gameData.ball.resetting = false;
            } else {
                gameData.ball.x += gameData.ball.dx;
                gameData.ball.y += gameData.ball.dy;
            }
        };

        const checkWallCollision = () => {
            if (gameData.ball.y <= 0 || gameData.ball.y + gameData.ball.height >= canvas.height) {
                gameData.ball.dy = -gameData.ball.dy;
            }
            if (gameData.ball.x <= 0) {
                resetBall(gameData.rightPaddle);
                players.secondScore += 1;
            }
            if (gameData.ball.x + gameData.ball.width >= canvas.width) {
                resetBall(gameData.leftPaddle);
                players.firstScore += 1;
            }
        };

        const resetBall = (paddle: Paddle) => {
            gameData.ball.resetting = true;
            gameData.ball.dx = -gameData.ball.dx;
            gameData.ball.dy = -gameData.ball.dy;
            gameData.ball.x = paddle.x - gameData.ball.width;
            gameData.ball.y = canvas.height / 2;
        };

        const movePaddle = (paddle: Paddle) => {
            paddle.y += paddle.dy;
            if (paddle.y < grid) {
                paddle.y = grid;
            } else if (paddle.y > maxPaddleY) {
                paddle.y = maxPaddleY;
            }
        };

        const checkPaddleCollision = (paddle: Paddle, isLeft : boolean) => {
            if (
                gameData.ball.x < paddle.x + paddle.width &&
                gameData.ball.x + gameData.ball.width > paddle.x &&
                gameData.ball.y < paddle.y + paddle.height &&
                gameData.ball.y + gameData.ball.height > paddle.y
            ) {
                gameData.ball.dx *= -1
                if (isLeft)
                    gameData.ball.x = paddle.x + paddle.width;
                else
                    gameData.ball.x = paddle.x - paddle.width;
                const ballCenter = gameData.ball.y + gameData.ball.height / 2;
                const paddleCenter = paddle.y + paddle.height / 2;
                const centerDiff = ballCenter - paddleCenter;
                const maxBounceAngle = Math.PI / 3;
                let bounceAngle = centerDiff / (paddle.height / 2) * maxBounceAngle;

                if (gameData.ball.dx > 0) {
                    bounceAngle = Math.PI - bounceAngle; // flip angle
                }

                gameData.ball.dx = ballSpeed * Math.cos(bounceAngle);
                gameData.ball.dy = ballSpeed * -Math.sin(bounceAngle);
                gameData.ball.dx *= -1; // switch direction
            }
        };

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawNet();
            drawPaddle(gameData.leftPaddle);
            drawPaddle(gameData.rightPaddle);
            drawBall(gameData.ball);
            drawTimer();
            drawScore(players);
        };

        const update = () => {
            moveBall();
            checkWallCollision();
            checkPaddleCollision(gameData.leftPaddle, true);
            checkPaddleCollision(gameData.rightPaddle, false);
            movePaddle(gameData.leftPaddle);
            movePaddle(gameData.rightPaddle);
            draw();
        };
        const onKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'w':
                    gameData.leftPaddle.dy = -paddleSpeed;
                    console.log(gameData.players.firstScore);
                    gameDataUpdate(gameData);
                    break;
                case 's':
                    gameData.leftPaddle.dy = paddleSpeed;
                    break;
                case 'ArrowUp':
                    gameData.rightPaddle.dy = -paddleSpeed;
                    break;
                case 'ArrowDown':
                    gameData.rightPaddle.dy = paddleSpeed;
                    break;
            }
        };

        const onKeyUp = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'w':
                case 's':
                    gameData.leftPaddle.dy = 0;
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                    gameData.rightPaddle.dy = 0;
                    break;
            }
        };

        draw();
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        const intervalId = setInterval(update, 1000 / 60);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
            clearInterval(intervalId);
        };
    }, [gameData]);

    return (
        <canvas ref={canvasRef} width={800} height={530} />
    )
}

export default PingPong;