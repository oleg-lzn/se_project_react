const baseUrl = "http://localhost:3001";

function _request(url, options) {
  return fetch(url, options);
}

function checkApiResponse(res) {
  if (res.ok) {
    return res.json();
  } else return Promise.reject(`Error: ${res.status}`);
}

function getClothingItems() {
  return _request(`${baseUrl}/items`, {}).then(checkApiResponse);
}

function deleteClothingItem(id) {
  return _request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkApiResponse);
}

function addClothingItem(item) {
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
  })
    .then(checkApiResponse)
    .then((newItem) => {
      console.log("Server Response", newItem);
      return newItem;
    });
}

export { getClothingItems, addClothingItem, deleteClothingItem };
