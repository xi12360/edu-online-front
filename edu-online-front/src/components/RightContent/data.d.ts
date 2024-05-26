import React from "react";

export interface DescriptionItemProps {
  title: string;
  content: React.ReactNode;
}

export type UserMessageData = {
  addTime?: string,
  content?: string,
  id?: string,
  status?: number,
  toId?: string
};

export type MsgSystemVO = {
  id: string
  addTime: Date
  content: string
  status: number
  toId: string
}
