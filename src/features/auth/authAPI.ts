import { AxiosPromise } from 'axios';
import { ISigininPayload } from '../../@types/auth';
import { VirtualMeAPI } from '../../app/axios';
import { IUser } from '@virtual-me/virtual-me-ts-core';

const axiosInstance = VirtualMeAPI.getInstance();

export function getMe() {
  return axiosInstance({
    method: 'get',
    url: '/user/me',
  })
}

export function authWithGithubCB(): AxiosPromise<any> {
  return axiosInstance({
    method: 'get',
    url: '/auth/github/callback',
  }).catch(e => {
    let errorMessage = "Unable to reach the server";
    if (e.response) {
      switch (e.response.status) {
        case 400: errorMessage = 'signin.form.error.400'
          break;
        default: errorMessage = 'signin.form.error.default';
          break;
      }
    }
    const err = new Error(errorMessage)
    throw err;
  })
}

export function signin(payload: ISigininPayload): AxiosPromise<IUser> {
  return axiosInstance({
    method: 'post',
    url: '/auth/signin',
    data: payload
  }).catch(e => {
    let errorMessage = "Unable to reach the server";
    if (e.response) {
      switch (e.response.status) {
        case 400: errorMessage = 'signin.form.error.400'
          break;
        default: errorMessage = 'signin.form.error.default';
          break;
      }
    }
    const err = new Error(errorMessage)
    throw err;
  })
}

export function signup(payload: ISigininPayload): AxiosPromise<IUser> {
  return axiosInstance({
    method: 'post',
    url: '/auth/signup',
    data: payload
  }).catch(e => {
    let errorMessage = "Unable to reach the server";
    if (e.response) {
      switch (e.response.status) {
        case 400: errorMessage = 'signup.form.error.400'
          break;
        default: errorMessage = 'signup.form.error.default';
          break;
      }

    }
    const err = new Error(errorMessage)
    throw err;
  })
}


