export default function fetcher<T, U>(url: T, data?: U) {
  return fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(data),
  }).then((d) => d.json());
}
