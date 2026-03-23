import config from "../configs/config";

export async function getListFriendByUserId({ userId, token }) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/friends`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })

  const response = await res.json();

  if (response.success) {
    return response.data;
  }
}

export async function addFriend({ userId, friendId, token }) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/friends/${friendId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ status: "PENDING" })
  });

  const response = await res.json();

  if (response.success) {
    return response.data;
  }
}