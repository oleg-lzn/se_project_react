import { baseUrl } from "./constants";
const token = localStorage.getItem("jwt");

export function _request(url, options) {
  return fetch(url, options).then((res) => checkApiResponse(res));
}

function checkApiResponse(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Error: ${res.status}`);
}

export function getClothingItems() {
  return _request(`${baseUrl}/items`, {});
}

export function deleteClothingItem(id) {
  return _request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function addClothingItem({ name_input, url_input, radio_input }) {
  return _request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name_input,
      weather: radio_input,
      imageUrl: url_input,
    }),
  }).then((newItem) => {
    console.log("Server Response", newItem);
    return newItem;
  });
}
