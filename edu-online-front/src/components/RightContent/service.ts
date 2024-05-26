import {UserMessageData} from "@/pages/UserMessage/components/data";
import {request} from "@@/plugin-request/request";
import {MsgSystemVO} from "@/components/RightContent/data";

export async function queryUserMessage(
  params: string
): Promise<{ data: {msgSystemVOList: MsgSystemVO[], totalNum: number} }> {
  return request('/api/sysMsg/get', {
    params: {userId: params},
    method: 'GET'
  });
}
