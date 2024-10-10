export function index({ request, response, database }) {
  const { status, user_name } = request.query
  const { id } = request.params

  const filters = {}
  if (id) filters.id = id 
  if (status)  
    filters.status = status
  if (user_name)  
    filters.user_name = user_name

  const tickets = database.select("tickets", filters)

  return response.end(JSON.stringify(tickets))
}