import { RecipientType, TextMessage } from "@virtual-me/virtual-me-ts-core";

export class I18NTextMessage extends TextMessage {
  public translatable: boolean = true;
  public readonly from = { type: RecipientType.SYSTEM };
  constructor(content: string, from?: RecipientType ) {
    super(content);
  }
}