export function updateStatus({ request, response, database }) {
  const { id } = request.params
  const status = request.url.includes("close") ? "close" : "open"

  database.update("tickets", id, { status })
  return response.end()
}