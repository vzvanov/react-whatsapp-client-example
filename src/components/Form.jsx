import React, { useState } from "react";

const Form = ({ onSendMessage, onReceiveMessage }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [messageText, setMessageText] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    onSendMessage({ idInstance, apiTokenInstance, phoneNumber, messageText });
    setMessageText('');
  }

  const receiveMessage = () => {
    if (!idInstance) {
      alert('idInstance is empty');
      return;
    }
    if (!apiTokenInstance) {
      alert('apiTokenInstance is empty');
      return;
    }
    onReceiveMessage({ idInstance, apiTokenInstance });
  }

  return (
    <form
      className="inputs"
      method="post"
      action="#"
      onSubmit={e => submitForm(e)}
    >
      <div className="form-container">
        <div className="form-row">
          <div className="form-row__left">
            <div className="item">
              <input
                required
                type="text"
                placeholder="idInstance"
                value={idInstance}
                onChange={e => setIdInstance(e.target.value)}
              />
            </div>
            <div className="item">
              <input
                required
                type="text"
                placeholder="apiTokenInstance"
                value={apiTokenInstance}
                onChange={e => setApiTokenInstance(e.target.value)}
              />
            </div>
            <div className="item">
              <input
                required
                type="tel"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row__right">
            <label>Message:</label>
            <textarea
              required
              rows="5"
              cols="30"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            >
            </textarea>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row__left">
            <button
              type="submit"
              id="SendWhatsAppBtn"
              className="button buttonGreen"
            >
              Send Message
            </button>
          </div>
          <div className="form-row__right">
            <button
              type="button"
              id="ReceiveWhatsAppBtn"
              className="button buttonGreen"
              onClick={receiveMessage}
            >
              Receive message
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;