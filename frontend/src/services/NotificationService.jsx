import config from "../configs/config";

export async function getByUser({ userId, token }) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/notifications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const response = await res.json();
  console.log(response);
  if (response.success) {
    return response.data;
  }
}

export async function createNotification({ body, userId, token }) {
  const res = await fetch(`${config.BASE_API}/users/${userId}/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const response = await res.json();

  if (response.success) {
    return response.data;
  }
}