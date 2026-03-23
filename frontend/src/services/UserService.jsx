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
    return response.data.count;
  }
}

export async function getUsers({ token }) {
  const res = await fetch(`${config.BASE_API}/users`, {
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

export async function getFriendsOfUser({ userId, token }) {
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

export async function getNotFriendsOfUser({ userId, token }) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/not-friends`, {
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


