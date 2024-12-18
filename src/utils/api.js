const baseUrl = "http://localhost:3001";

function _request(url, options) {
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
    },
  });
}

export function addClothingItem(item) {
  return _request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: item.inputName,
      weather: item.weather,
      imageUrl: item.inputUrl,
    }),
  }).then((newItem) => {
    console.log("Server Response", newItem);
    return newItem;
  });
}
