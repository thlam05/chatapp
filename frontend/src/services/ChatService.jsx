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

export async function addMemberToChat({ conversationId, userId, token }) {
  const res = await fetch(`${config.BASE_API}/conversations/${conversationId}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ userId })
  })

  if (!res.ok) {
    throw new Error("Request failed");
  }

  const response = await res.json();

  if (response.success) {
    return response.data;
  }

  return null;
}

export async function deleteChat({ conversationId, token }) {
  const res = await fetch(`${config.BASE_API}/conversations/${conversationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  const response = await res.json();
}

export async function createChat({ name, token }) {
  const res = await fetch(`${config.BASE_API}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, isGroup: true })
  })
  if (!res.ok) {
    throw new Error("Request failed");
  }

  const response = await res.json();

  if (response.success) {
    return response.data;
  }
}

export async function createPrivateChat({ friendId, token }) {
  const res = await fetch(`${config.BASE_API}/conversations/private`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ friendId })
  })
  if (!res.ok) {
    throw new Error("Request failed");
  }

  const response = await res.json();

  if (response.success) {
    return response.data;
  }
}

export async function findPrivateChat({ friendId, token }) {
  const res = await fetch(`${config.BASE_API}/conversations/private/${friendId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  if (!res.ok) {
    throw new Error("Request failed");
  }

  const response = await res.json();

  if (response.success) {
    return response.data;
  }
  return null;
}

export async function getConversationById({ conversationId, token }) {
  const res = await fetch(`${config.BASE_API}/conversations/${conversationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  if (!res.ok) {
    throw new Error("Request failed");
  }

  const response = await res.json();

  if (response.success) {
    return response.data;
  }
  return null;
}


export async function accessChat({ friend, token }) {
  const res = await fetch(`${config.BASE_API}/conversations/access`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ partnerId: friend.user.id })
  })

  if (!res.ok) {
    throw new Error("Request failed");
  }

  const response = await res.json();

  if (response.success) {
    return response.data;
  }
  return null;
}