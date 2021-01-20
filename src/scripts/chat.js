// add chat
// set real-time listner ot get new chats
// update username
// update room
const updateMssg = document.querySelector('.update-mssg');

export class chatRoom {
    constructor(  room, username ){
        this.room = room;
        this.username = username;
        // db.chat will connect you to the database
        // 'chats' will point to the collection you
        // you want to retrieve data from
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addchats( message ){
        // format chat
        const now = new Date(); // will tell when user has submited chat
        const chat = {
            room: this.room,
            username: this.username,
            message,
            // ?? firebase.firestore.Timestamp
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        //save chat document
        // ?? add
        const response = await this.chats.add(chat);
        return response;
    }

    getChats ( callback ) {
        this.unsub = this.chats
                .where( 'room', '==', this.room )
                .orderBy( 'created_at' )
                // ?? onSnapshot
                .onSnapshot( snapshot => {
                    // ?? docChanges 
                    snapshot.docChanges().forEach( change => {
                        // ?? data type 'added'
                        if( change.type === 'added' ){
                            callback( change.doc.data());
                        }
                    })
                });
    }
    updateName( username ){
        this.username = username;
        localStorage.setItem( 'username', username );
    }
    updateRoom( room ){
        this.room = room;
        updateMssg.innerHTML = `Chatroom Changed to ${room}`;
        setTimeout( () => { updateMssg.innerHTML = '' }, 3000 )
        if(this.unsub){
            this.unsub()
        }
    }

}

