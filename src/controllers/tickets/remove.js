export function remove({ request, response, database }) {
  const { id } = request.params

  if (database.delete("tickets", id)) return response.end();
  else return response.writeHead(404).end("Ticket não encontrado!");
}