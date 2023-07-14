# ft_transcendence
This project is about creating a website for the mighty Pong contest!\
by [doreshev](https://github.com/doreshev), [tomah56](https://github.com/tomah56) & [pweinstock](https://github.com/pweinstock)
## Overview
Thanks to your website, users will play Pong with others. You will provide a nice user interface, a chat, and real-time multiplayer online games!
Your work has to comply with the following rules:
- Your website backend must be written in NestJS.
- The frontend must be written with a TypeScript framework of your choice.
- You are free to use any library you want to in this context. However, you must use the latest stable version of every library or framework used in your project.
- You must use a PostgreSQL database. That’s it, no other database.
- Your website must be a [single-page application](https://en.wikipedia.org/wiki/Single-page_application). The user should be able to use the Back and Forward buttons of the browser.
- Your website must be compatible with the latest stable up-to-date version of Google Chrome and one additional web browser of your choice.
- The user should encounter no unhandled errors and no warnings when browsing the website.
- Everything has to be launch by a single call to: `docker-compose up --build`
## Security concerns
In order to create a fully functional website, here are a few security concerns that you have to tackle:
- Any password stored in your database must be hashed.
- Your website must be protected against SQL injections.
- You must implement some kind of server-side validation for forms and any user input.
## User Account
The user must login using the OAuth system of 42 intranet.
- The user should be able to choose a unique name that will be displayed on the website.
- The user should be able to upload an avatar. If the user doesn’t upload an avatar, a default one must be set.
- The user should be able to enable two-factor authentication. For instance, Google Authenticator or sending a text message to their phone.
- The user should be able to add other users as friends and see their current status (online, offline, in a game, and so forth).
- Stats (such as: wins and losses, ladder level, achievements, and so forth) have to be displayed on the user profile.
- Each user should have a Match History including 1v1 games, ladder, and anything else useful. Anyone who is logged in should be able to consult it.
## Chat
You also have to create a chat for your users:
- The user should be able to create channels (chat rooms) that can be either public, or private, or protected by a password.
- The user should be able to send direct messages to other users.
- The user should be able to block other users. This way, they will see no more messages from the account they blocked.
- The user who has created a new channel is automatically set as the channel owner until they leave it.
  - The channel owner can set a password required to access the channel, change it, and also remove it.
  - The channel owner is a channel administrator. They can set other users as administrators.
  - A user who is an administrator of a channel can kick, ban or mute (for a limited time) other users, but not the channel owners.
- The user should be able to invite other users to play a Pong game through the chat interface.
- The user should be able to access other players profiles through the chat interface.
## Game
The main purpose of this website is to play Pong versus other players.
- Therefore, users should be able to play a live Pong game versus another player directly on the website.
- There must be a matchmaking system: the user can join a queue until they get automatically matched with someone else.
- It can be a canvas game, or it can be a game rendered in 3D, it can also be ugly, but in any case, it must be faithful to the original Pong (1972).
- You must offer some customization options (for example, power-ups or different maps). However, the user should be able to select a default version of the game without any extra features if they want to.
- The game must be responsive!

## How to Use
```
git clone https://github.com/pweinstock/ft_transcendence.git
cd ft_transcendence
```
create a .env file in the root of the repository.
```
PORT=
CHAT_PORT = 
GAME_PORT = 
SOCKET_PORT=
USER_PORT=
#Postgres
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_PORT=
##BACKEND
#42 API
FORTYTWO_APP_ID=
FORTYTWO_APP_SECRET=
HOST_IP=
JWT_SECRET=
JWT_EXPIRES_IN=
```
Set the variables with the desired values.

`make` to run the Project.\
`make down` to shutdown the server.\
`make clean` to delete every docker container/image/volume.


### Login
![Screen Shot 2023-06-05 at 12 42 28 PM 1](https://github.com/pweinstock/ft_transcendence/assets/37242263/2ef5151a-31df-4f7f-882b-1d35ebbe8790)
![Screen Shot 2023-06-05 at 12 43 40 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/3d59b26f-11ff-4453-9fe3-89265617106b)
![Screen Shot 2023-06-05 at 6 59 22 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/608afba3-307e-42b2-9158-fc9431b08d91)
### Home
![Screen Shot 2023-06-05 at 1 13 08 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/67000227-a6cf-4f52-b623-ed8aead3af3e)
### Two-Factor Authentication
![Screen Shot 2023-06-05 at 5 04 12 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/4f311e1b-4905-4680-85e2-6bff322c2549)
![Screen Shot 2023-06-05 at 5 04 39 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/fb57473c-1d35-4a2c-a249-2cea2b7053d0)
![Screen Shot 2023-06-05 at 5 05 47 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/44935b76-ba56-441f-9009-a127b1154ce3)
### ChatRooms
![Screen Shot 2023-06-05 at 1 41 11 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/83c28888-8fb9-4743-98cb-d1fc410e44b3)
### Game
![Screen Shot 2023-06-05 at 1 00 42 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/db497d54-f0e2-4bd9-83af-61d025151a6a)
![Screen Shot 2023-06-05 at 1 01 12 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/5b7e7625-f9d6-465d-85c4-4b016a7ee17f)
![Screen Shot 2023-06-05 at 1 02 18 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/8455b4c3-0842-4404-8707-78ad93c7c566)
![Screen Shot 2023-06-05 at 1 08 43 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/0c8d0ae5-d0cd-418e-b1c9-316cc4240791)
![Screen Shot 2023-06-05 at 1 05 14 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/bc863ce2-a6c3-4db5-a5d6-2b17094e86e4)
### HighScore
![Screen Shot 2023-06-05 at 1 13 42 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/0a3136d1-53e6-4f42-8fb0-7e6bb5d28792)
### Friends
![Screen Shot 2023-06-05 at 1 42 44 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/097041d7-ccca-4905-bca5-5b323c90ca88)
![Screen Shot 2023-06-05 at 1 43 03 PM](https://github.com/pweinstock/ft_transcendence/assets/37242263/e39fd4f9-6006-4e78-af30-08f30319a399)
