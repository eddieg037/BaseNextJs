export const apiHandler = {
  getData,
  postData,
  deleteData,
};
//Change to deployment url
const urlDev = "http://localhost:3000";

async function getData(url: string) {
  const response = await fetch(urlDev + url, {
    method: "GET",
    mode: "same-origin",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

async function postData(url: string, data: any) {
  const response = await fetch(urlDev + url, {
    method: "POST", 
    mode: "same-origin",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function deleteData(url: string) {
  const response = await fetch(urlDev + url, {
    method: "DELETE",
    mode: "same-origin",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}
