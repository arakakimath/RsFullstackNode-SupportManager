export function updateStatus({ request, response, database }) {
  const { id } = request.params;
  const status = request.url.includes("close") ? "closed" : "open";
  const { solution } = request.body;

  database.update("tickets", id, { status, solution });
  return response.end();
}
