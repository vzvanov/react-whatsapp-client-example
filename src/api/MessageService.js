import axios from "axios";

const host = 'https://api.green-api.com';

export default class MessageService {

  static async sendMessage(data) {
    const { idInstance, apiTokenInstance, phoneNumber, messageText } = data;
    const url = `${host}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`;
    const response = await axios.post(url, {
      "chatId": `${phoneNumber}@c.us`,
      "message": messageText
    });
    return response;
  }

  static async receiveNotification(data) {
    const { idInstance, apiTokenInstance } = data;
    const url = `${host}/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`;
    const response = await axios.get(url);
    return response;
  }

  static async deleteNotification(data) {
    const { idInstance, apiTokenInstance, receiptId } = data;
    const url = `${host}/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`;
    const response = await axios.delete(url);
    return response;
  }

}