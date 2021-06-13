export enum MessageType {
  TEXT = 'text'
}

export enum MessageSender {
  BOT,
  USER
}

export interface IMessage<T> {
  type: MessageType
  content: T
  from: MessageSender
  markdown?: any
  delay?: any
}

export class TextMessage implements IMessage<String> {
  public readonly type: MessageType = MessageType.TEXT;
  public content: String;
  public readonly from: MessageSender;
  
  constructor(content: String) {
    this.content = content;
    this.from = MessageSender.USER;
    
  }
}