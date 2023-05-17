import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Section from './components/Section';
import MessageService from './api/MessageService';
import Info from './components/Info';

function App() {
  const [arrayMessages, setMessages] = useState([]);
  const [textInfo, setTextInfo] = useState('');

  const onSendMessage = async (data) => {
    setTextInfo('');
    const response = await MessageService.sendMessage(data);
    const { status } = response;

    if (status === 200) {
      const { messageText } = data;
      const newArrayMessages = getNewArrayMessages(messageText, 'output');
      setMessages(newArrayMessages);
    } else {
      setTextInfo('Message not sent.');
    }
  }

  const onReceiveMessage = async (data) => {
    setTextInfo('');
    const respReceive = await MessageService.receiveNotification(data);
    const { status } = respReceive;
    console.log(respReceive);

    if (status === 200) {
      if (!respReceive.data) {
        setTextInfo('No data received, see console for details');
        return;
      };

      const { receiptId } = respReceive.data;
      const { typeWebhook } = respReceive.data.body;

      setTextInfo(`There is received data with type: '${typeWebhook}', see console for details`);

      if (typeWebhook === 'outgoingMessageReceived') {
        const { messageData } = respReceive.data.body;
        if (messageData.typeMessage === 'textMessage') {
          const { textMessage } = messageData.textMessageData;
          const newArrayMessages = getNewArrayMessages(textMessage, 'input');
          setMessages(newArrayMessages);
        }
      }

      const receipIdData = { ...data };
      receipIdData.receiptId = receiptId;
      await MessageService.deleteNotification(receipIdData);
    } else {
      setTextInfo('No data received, see console for details');
    }
  }

  const getNewArrayMessages = (messageText, typeMessage) => {
    const id = Date.now();
    const [...newArrayMessages] = arrayMessages;

    let message = {
      "text": messageText,
      "type": typeMessage,
      "id": id
    }
    newArrayMessages.push(message);
    return newArrayMessages;
  }

  return (
    <div className="wrapper">
      <h1 className="title">WhatsApp client</h1>
      <main>
        <article className="messages">
          {arrayMessages.map(item =>
            <Section
              text={item.text}
              type={item.type}
              id={item.id}
            />
          )}
        </article>
      </main>
      <Info
        text={textInfo}
      />
      <Form
        onSendMessage={onSendMessage}
        onReceiveMessage={onReceiveMessage}
      />
    </div>
  );
}

export default App;