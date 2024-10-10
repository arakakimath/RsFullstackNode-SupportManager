import { randomUUID } from "node:crypto"
import dayjs from "dayjs";

export function create({ request, response, database }){
  const { equipment, description, user_name } = request.body;

  const ticket = {
    id: randomUUID(),
    equipment,
    description,
    user_name,
    status: "open",
    created_at: dayjs(),
    last_updated_at: dayjs()
  }

  database.insert("tickets", ticket)

  response.writeHead(201).end(JSON.stringify(ticket))
}