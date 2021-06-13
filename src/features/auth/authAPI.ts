import axios from 'axios';
import { ISigininPayload } from '../../@types/auth';
import { VirtualMeAPI } from '../../app/axios';

const axiosInstance = VirtualMeAPI.getInstance();

// A mock function to mimic making an async request for data
export function signin(payload: ISigininPayload) {
  console.log("coucou")
  console.log(process.env.REACT_APP_VIRTUAL_ME_API_BASE_URL)
  return axiosInstance({
    method: 'post',
    url: '/auth/signin',
    data: payload
  })
}

// A mock function to mimic making an async request for data
export function signup(payload: ISigininPayload) {
  return new Promise<string>((resolve) =>
    setTimeout(() => resolve('ok'), 500)
  );
}
