import {request} from "@@/plugin-request/request";
import {UserMessageData} from "@/pages/UserMessage/components/data";
import ReactRequest from "react-request";

export async function queryUserMessage(
  params: { initialState: undefined }
): Promise<{ data: UserMessageData[] }> {
  return request('/api/sysMsg/get', {
    params: {userId: params}
  });
}
