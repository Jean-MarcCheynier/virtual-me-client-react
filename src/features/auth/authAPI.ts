import { ISigininPayload } from '../../@types/auth';
import { VirtualMeAPI } from '../../app/axios';

const axiosInstance = VirtualMeAPI.getInstance();


export function getMe() {
  return axiosInstance({
    method: 'get',
    url: '/auth/me',
  })
}


export function signin(payload: ISigininPayload) {
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


