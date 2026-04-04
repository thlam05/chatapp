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

export async function deleteFriend({ userId, friendId, token }) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/friends/${friendId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const response = await res.json();

  console.log(response);
}

export async function updateFriend({ userId, friendId, status, token }) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/friends/${friendId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });

  const response = await res.json();

  if (response.success) {
    console.log(response);
    return response.data;
  }
}