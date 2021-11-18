import { AxiosPromise } from 'axios';
import { VirtualMeAPI } from '../../app/axios';
import { ICv } from '@virtual-me/virtual-me-ts-core';

const axiosInstance = VirtualMeAPI.getInstance();

export function getAll(): AxiosPromise<ICv[]> {
  return axiosInstance({
    method: 'get',
    url: '/cv'
  })
}