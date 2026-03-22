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

	console.log(response);

	if (response.success) {
		return response.data;
	}
}