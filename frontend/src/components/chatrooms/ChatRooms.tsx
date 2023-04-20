import React, { useState, useEffect, ChangeEvent } from 'react';
import {io} from "socket.io-client";
import axios from "axios";
import { User } from "../BaseInterface";
import './chatstyle.css';
import NewChat from './NewChat';
import CreateChat from './CreateChat';
import PublicChatList from './PublicChatList';

interface ChatProps {
    user: User;
}

const ChatRooms: React.FC<ChatProps> = (props) => {

const [value, setValue] = useState<{id: string, name: string }[]>([]);
const [chatNameValue, setchatNameValue] = useState<string>("");
const [actualChatid, setactualChatid] = useState<string | undefined>(undefined);
const [actualChatName, setactualChatName] = useState<string | undefined>(undefined);
const [addThisUserId, setaddThisUserId] = useState<string>("");


useEffect(() => {
	async function fetchChatrooms() {
		try{
			const response = await axios.get(`http://${window.location.hostname}:5000/chat`, {withCredentials: true});
			if (response)
				setValue(response.data);
			}
			catch(e) {
				console.log("error");
			}
	}
	fetchChatrooms();
},[chatNameValue, value]);

function addUserHandler(UserId :string) {
	axios.post(`http://${window.location.hostname}:5000/chat/addUser`,  { userId : addThisUserId,  chatId : actualChatid }, {withCredentials: true}).then( () => {
	}).catch((reason) => {
		if (reason.response!.status !== 200) {
			console.log("Error while adding user in chatid:");
			console.log(actualChatid);
		}
		console.log(reason.message);
	});
}


async function deleteChatNutton(id : string) {
	axios.get(`http://${window.location.hostname}:5000/chat/delete/`+  id , {withCredentials: true})
		.catch((reason) => {
		if (reason.response!.status !== 200) {
			console.log("Error in deleteing chat, in chatid:");
			console.log(id);
		}
		console.log(reason.message);
		});
		setchatNameValue("");
}
const handleParentStateUpdate = (newState: string) => {
	setchatNameValue(newState);
};

return (
	<>
		<section>
			<div className='chatbox'>
				<div className='chatside'>
				<div className='toborderside'>
					<div className='mychatlist'>
						<p>My Chats:</p>
						{value && value.map((item, index) => (
							<div key={item.id} className='buttonholder' style={{color: "white"}}>
									<button className='chatbutton' onClick={() => {
									setactualChatid(item.id);
									setactualChatName(item.name);
									}} >{item.name}</button>
								<button className='chatbuttondel' onClick={() => {
									deleteChatNutton(item.id);
									}} >X</button>
							</div>
						))}
					</div>
					<CreateChat chatName={chatNameValue} onUpdate={handleParentStateUpdate}/>
					<PublicChatList user={props.user} chatName={chatNameValue} onUpdate={handleParentStateUpdate}/>
				</div>
				</div>
				<div className='chatcontent'>
					{actualChatid && actualChatName && <NewChat user={props.user} chatidp={actualChatid} chatName={actualChatName}/>}
					{!actualChatid && <h1>No Chat</h1> }

				</div>
			</div>

		</section>
	</>
);
}
export default ChatRooms;
