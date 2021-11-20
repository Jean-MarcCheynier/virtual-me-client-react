import { EnhancedStore } from "@reduxjs/toolkit";
import axios, { AxiosInstance } from "axios";

export class VirtualMeAPI {
  private static instance: AxiosInstance;
  
  private constructor() { };
  
  public static getInstance() {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: process.env.REACT_APP_VIRTUAL_ME_API_BASE_URL,
        timeout: 6000,
        headers: {
          accept: '*/*',
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
        }
      })
    }
    return this.instance
  }
  
  // Anti pattern
  public static initInterceptor(store: EnhancedStore) {
    this.getInstance().interceptors.request.use(req => {
      const state = store.getState();
      const token = state.auth.jwt;
      req.headers.authorization = `Bearer ${token}`;
      return req;
    });
  }
  
}
