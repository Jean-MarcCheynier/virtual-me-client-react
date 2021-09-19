// A mock function to mimic making an async request for data
import { VirtualMeAPI } from '../../app/axios';
import { ITextMessage } from '@virtual-me/virtual-me-ts-core';


const axiosInstance = VirtualMeAPI.getInstance();

export function sendMessage(payload: { message: ITextMessage }) {
  return axiosInstance({
    method: 'post',
    url: '/bot/dialog',
    data: payload
  })
}
