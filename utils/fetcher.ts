export default async function fetcher<T, U>(url: T, data?: U) {
  const res = await fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-type": "Application/json",
    },
    body: JSON.stringify(data),
  });
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.

  if (!res.ok) {
    const error: any = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}
