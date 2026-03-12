import config from "../configs/config";

export async function getTotalMessages(userId, token) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/messages/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })

  const response = await res.json();

  if (response.success) {
    console.log(response);
    return response.data.count;
  }
}

export async function getTotalFriends(userId, token) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/friends/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })

  const response = await res.json();

  if (response.success) {
    console.log(response);
    return response.data.count;
  }
}

export async function getTotalChats(userId, token) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/conversations/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })

  const response = await res.json();

  if (response.success) {
    console.log(response);
    return response.data.count;
  }
}