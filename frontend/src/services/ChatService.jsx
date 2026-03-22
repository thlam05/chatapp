import config from "../configs/config";

export async function getListChatByUser({ userId, token }) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/conversations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })

  const response = await res.json();

  if (response.success) {
    const list = response.data.map((conversation) => {

      let latestMessage = conversation.messages?.reduce((latest, msg) => {
        if (!latest) return msg;
        return new Date(msg.createdAt) > new Date(latest.createdAt) ? msg : latest;
      }, null);

      return {
        ...conversation,
        latestMessage
      };
    });
    return list;
  }
  return null;
}

export async function sendMessage({ content, conversationId, userId, token }) {
  const res = await fetch(`${config.BASE_API}/conversations/${conversationId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  })

  if (!res.ok) {
    throw new Error("Request failed");
  }

  const response = await res.json();

  if (response.success) {
    const message = response.data;
    return message;
  }

  return null;
}