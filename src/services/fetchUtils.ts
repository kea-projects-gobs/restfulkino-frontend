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
