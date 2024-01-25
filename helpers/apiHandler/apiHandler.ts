export const apiHandler = {
  getData,
  postData,
  deleteData,
};
//Change to deployment url
const urlDev = process.env.VERCEL_URL ? process.env.VERCEL_URL : process.env.NEXT_PUBLIC_DEV_API_URL;

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
