import { chatRoom } from './chat'
import { ChatUI } from './ui'
// import 'core-js';

const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

function chalu(){
    const username = localStorage.username ? localStorage.username : 'anon';
    const chatroom = new chatRoom( 'general', username );

    const chatui = new ChatUI(chatList);
    const newNameForm = document.querySelector('.new-name')

    // add new chat
    newChatForm.addEventListener( 'submit', e => {
        e.preventDefault();
        const message = newChatForm.message.value.trim();
        chatroom.addchats(message)
            .then( ()=> {newChatForm.reset()})
            .catch( (err) => {console.log(err)} )
    })

    chatroom.getChats( (data) => {
        chatui.render(data)
    })

    // update username
    newNameForm.addEventListener( 'submit', e => {
        e.preventDefault();
        const newName = newNameForm.name.value.trim();
        chatroom.updateName(newName);
        newNameForm.reset();
        updateMssg.innerHTML = `Your Name Was Updated to ${newName}`;
        setTimeout( () => { updateMssg.innerHTML = '' }, 3000 )
    })

    // update room
    rooms.addEventListener( 'click', e => {
        if( e.target.tagName === 'BUTTON' ){
            chatui.clear();
            chatroom.updateRoom( e.target.getAttribute( 'id' ) );
            chatroom.getChats( chat => { chatui.render(chat) } )
        }
    })
}

chalu();