// A mock function to mimic making an async request for data
import { VirtualMeAPI } from '../../app/axios';
import { ITextMessage } from '@virtual-me/virtual-me-ts-core';
import { AxiosPromise } from 'axios';
import { IMessage } from '@virtual-me/virtual-me-ts-core';
import { I18NTextMessage } from '../../@types/message';


const axiosInstance = VirtualMeAPI.getInstance();

export function sendMessage(payload: { message: ITextMessage }): AxiosPromise< IMessage<unknown>[] | I18NTextMessage[]> {
  return axiosInstance({
    method: 'post',
    url: '/bot/dialog',
    data: payload
  })
}
