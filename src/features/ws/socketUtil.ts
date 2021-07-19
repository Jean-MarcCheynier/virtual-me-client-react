import { io, Socket } from "socket.io-client";


console.log("WS connect");
const WS_BASE_URL = process.env.REACT_APP_VIRTUAL_ME_WS_BASE_URL || '';


export const socket: any = io(WS_BASE_URL,
  {
    transports: ["websocket"],
    autoConnect: false,
    auth: { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoxLCJfaWQiOiI2MGMxMzFmYzMxMDMxNmEyYTVmYjBiZTEiLCJuYW1lIjoidGVzdCIsImVtYWlsIjoiZGVmYXVsQGVtYWlsLmNvbSIsImxvZ2luIjoidGVzdCIsInBhc3N3b3JkIjoiJDJiJDEwJDBRNksvVHhqZTZZeXFCYUo3RjgzY09zVXovdnozOWVOcDE4d2dJRGJCN1NyY1VsNWhyWmZTIiwiY3JlYXRlZF9hdCI6IjIwMjEtMDYtMDlUMjE6MjY6MjAuMjA3WiIsInVwZGF0ZWRfYXQiOiIyMDIxLTA2LTEwVDEzOjI0OjU5LjYyNloiLCJfX3YiOjAsInNlc3Npb24iOnsiY29udmVyc2F0aW9uIjp7ImNvbnZlcnNhdGlvbl9pZCI6ImEzYjQyN2QxLTc2ODYtNDJhNy04M2U0LTE4NGM5Y2ZhZjZlZSJ9fSwiaWF0IjoxNjI0MTIwMDE5LCJleHAiOjE2MjQ5ODQwMTl9.BTisN6yupLJhv2ziDTpRypL6fL3grAHdmgUg4YBjrBQ" }
  });

socket.on("connect", () => {
  console.log("connected")
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});



