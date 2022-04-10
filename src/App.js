import './App.css';
import React, { useState } from 'react';
import MessageScreen from './components/MessageScreen';

function App() {
  const [messageScreen, setMessageScreen] = useState(false)
  const [postMessage, setPostMessage] = useState([])

  const DeletePost = (id) => {
    setPostMessage(postMessage.filter(Post => Post.id !== id))
  }

  return (
    <div className='App'>
      <nav className='navbar navbar-light' style={{ background: '#4267B2' }}>
        <h3 className='H3'>Face--book</h3>
      </nav>
      <br />
      <button className='btn btn-primary btn-sm' style={{ background: '#4267B2', color: 'white' }} onClick={() => setMessageScreen(true)}>Write a post</button>
      <br />
      <br />
      {messageScreen ? <MessageScreen setMessageScreen={setMessageScreen} postMessage={postMessage} setPostMessage={setPostMessage} /> : null}
      <br />
      <div className='row'>
        <div className='col-sm'></div>
        <div className='col'>
          <div className='container-sm'>
            {
              postMessage.map(msg =>
                <div>
                  <div style={{ background: msg.color, color: msg.font, border: '#C0C0C0 solid 1px' }} key={msg.id}>
                    <br />
                    <h6>{msg.message}</h6>
                    {
                      msg.isGiphy ? <img src={msg.selectGiphy.images.fixed_height.url} /> : null
                    }
                    <br />
                    <br />
                    <button className='btn btn-danger btn-sm' onClick={() => DeletePost(msg.id)}>Delete</button>
                    <br />
                    <br />
                  </div>
                  <br />
                </div>)
            }
          </div>
        </div>
        <div className='col-sm'></div>
      </div>
    </div>
  );
}

export default App;
