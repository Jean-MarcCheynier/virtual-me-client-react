import { AxiosPromise } from 'axios';
import { ISigininPayload } from '../../@types/auth';
import { VirtualMeAPI } from '../../app/axios';
import { IUser } from '@virtual-me/virtual-me-ts-core';

const axiosInstance = VirtualMeAPI.getInstance();

export function getMe() {
  return axiosInstance({
    method: 'get',
    url: '/auth/me',
  })
}

export function signin(payload: ISigininPayload): AxiosPromise<IUser> {
  return axiosInstance({
    method: 'post',
    url: '/auth/signin',
    data: payload
  })
}

export function signup(payload: ISigininPayload): AxiosPromise<IUser> {
  return axiosInstance({
    method: 'post',
    url: '/auth/signup',
    data: payload
  })
}


