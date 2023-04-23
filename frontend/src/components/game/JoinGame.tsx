import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {User} from "../BaseInterface";
import {GameInfo} from "./interfaces/game-info";
import PingPong from "./PingPong";
import {GameOption} from "./interfaces/game-option";
import {GameSocketContext, GameSocketProvider} from "../context/game-socket"

interface JoinGameProps {
    user : User;
}


export default function JoinGame(props : JoinGameProps) {
    const [gamestoJoin, setGamestoJoin] = useState<GameInfo[]>([]);
    const [gameOption, setGameOption] = useState<GameOption>();
    const [gameAvailiable, setgameAvailiable ] = useState<boolean>(false);

    const socket = useContext(GameSocketContext);
    const joinServer = (id : string) => {
        socket.emit("join", {displayName : props.user.displayName, gameId : id});
    }

    useEffect(() => {
        axios.get(`http://${window.location.hostname}:5000/game/join`, {withCredentials: true})
            .then(response => {
                if (response && response.status === 200)
                    setGamestoJoin(response.data);
            })
            .catch(e => {
                //todo : handle error
            })
    },[gameAvailiable])

    socket.on('created', () => {
        gameAvailiable ? setgameAvailiable(true) : setgameAvailiable(false)
    });

    socket.on("started", (data : GameOption) => {
        setGameOption(data);
    });

    socket.on("notStarted", () => {
        //todo : handle error
    });

    return (
        gameOption ?
            <PingPong gameOption={gameOption}/>
            :
            <div style={{color: "white"}}>
                {gamestoJoin.map((game) => (
                    <button className='navbutton' key={game.gameId} onClick={() => {
                        joinServer(game.gameId)
                    }}>
                        {"Play Against " + game.firstPlayer}
                    </button>
                ))}
            </div>
    )
}