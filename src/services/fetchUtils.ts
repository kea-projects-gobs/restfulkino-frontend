export async function handleHttpErrors(res: Response) {
  if (!res.ok) {
    const errorResponse = await res.json();
    const msg = errorResponse.message
      ? errorResponse.message
      : "No details provided";
    throw new Error(msg);
  }
  return res.json();
}

export function makeOptions(method: string, body: object | null, addToken?: boolean): RequestInit {
  const opts: RequestInit = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  if (addToken){
    const token = localStorage.getItem("token");
    opts.headers = { ...opts.headers, Authorization: `Bearer ${token}`};
  }
  return opts;
}