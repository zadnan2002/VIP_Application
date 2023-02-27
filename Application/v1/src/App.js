import logo from './logo.svg';
import './App.css';
import './normalize.css';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
function App() {
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState([{
    user:"botGPT",
    message:"Hello, I am a chatbot. How can I help you?"
  }]);

  async function handleSubmit(e){
    if (chatInput==='') {
      alert('Please enter a message');
      return;
    }
e.preventDefault();
console.log('submitted');
let ChatLogNew=[...chatLog, {user:"me", message:chatInput}];
setChatLog(ChatLogNew);
setChatInput('');
//Fetch trhe response to the api on backend combining the chatlog array of messages and sending it as a message to local host 3080 as a post request

const messages=ChatLogNew.map((message)=>message.message).join('\n');
const response = await fetch('http://localhost:3080/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    message: messages
  })
});
const data = await response.json();
console.log(data.message);
setChatLog([...ChatLogNew, {user:"botGPT", message:data.message}]);


  }
  function clearChat(){
    setChatLog([]);
  }
  return (
    <div className="App">
      <aside className='sidemenu'>
   <div className='sideMenuButton' onClick={clearChat}>
   <span className='sideMenuButtonIcon'>+ </span>
    New Chat
    </div>

      </aside>
      <section className='chatbox'>
        <div className='chatLog'>
          {chatLog.map((message, index)=>(
            <ChatMessage key={index} message={message}/>
          ))}
        
          
        </div>
<div className='chatInputHolder'>

  <form onSubmit={handleSubmit} style={{display:'flex'}}>
  <textarea value={chatInput} onChange={ (e)=>setChatInput(e.target.value) } rows={1} className='chatInput' placeholder='Type your message here...'>

  </textarea>
  <div className='buttonHolder'>
<SendIcon fontSize='large' onClick={handleSubmit} className='sendIcon' style={{cursor:'pointer',marginTop:"3%"}}/>
  </div>
  </form>
</div>
      </section>
   
    </div>
  );
}


const ChatMessage = ({message}) => {
  return(
    <div className={'chatMessage'+message.user}>
        <div className='avatar'>
          <Avatar style={{height:35,width:35}} src='./' alt={message.user}/>
        </div>
        <div className='message'>
          {message.message}
        </div>
        </div>
  )
}

export default App;
