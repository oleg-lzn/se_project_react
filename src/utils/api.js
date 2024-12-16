const baseUrl = "http://localhost:3001";

function getClothingItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    if (res.ok) {
      return res.json();
    } else return Promise.reject(`Error: ${res.status}`);
  });
}

export default getClothingItems;
