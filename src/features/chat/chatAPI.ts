// A mock function to mimic making an async request for data
import { VirtualMeAPI } from '../../app/axios';
import { IMessage } from '../../@types/message';
import { IDialogQuestion } from '../../@types/message';

const axiosInstance = VirtualMeAPI.getInstance();

export function sendMessage(payload: { message: IMessage<string|IDialogQuestion> }) {
  return axiosInstance({
    method: 'post',
    url: '/bot/dialog',
    data: payload
  })
}
