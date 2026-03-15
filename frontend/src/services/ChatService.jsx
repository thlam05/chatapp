import config from "../configs/config";

export async function getListChatByUser(userId, token) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/conversations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })

  const response = await res.json();

  console.log(response);

  if (response.success) {
    const list = response.data.map((conversation) => {

      const latestMessage = conversation.messages?.reduce((latest, msg) => {
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
}