export enum MessageType {
  TEXT = 'text'
}

export enum MessageSender {
  BOT,
  USER,
  SYSTEM,
}

export interface IDialogQuestion {
  title: string,
  buttons: any[]
}


export class DialogQuestion {
  title: string = "";
  buttons: any[] = []
}

export interface IMessage<T> {
  translatable?:boolean,
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
  
  constructor(content: String, from?: MessageSender) {
    this.content = content;
    this.from = MessageSender.USER;
  }
}

export class I18NTextMessage extends TextMessage {
  public translatable: boolean = true;
  public readonly from: MessageSender = MessageSender.SYSTEM
  constructor(content: String, from?: MessageSender ) {
    super(content);
  }
}