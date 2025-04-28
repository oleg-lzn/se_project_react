import { baseUrl } from "./constants";
import { getToken } from "./token";

export function _request(url, options) {
  return fetch(url, options).then((res) => checkApiResponse(res));
}

function checkApiResponse(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Error: ${res.status}`);
}

export function getClothingItems() {
  const token = getToken();
  return _request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deleteClothingItem(id) {
  const token = getToken();
  return _request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addClothingItem({ name, avatar, radio }) {
  const token = getToken();
  return _request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      weather: radio,
      imageUrl: avatar,
    }),
  }).then((newItem) => {
    console.log("Server Response", newItem);
    return newItem;
  });
}
