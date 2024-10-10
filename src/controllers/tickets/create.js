import { randomUUID } from "node:crypto"
import dayjs from "dayjs";

export function create({ request, response }){
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

  response.end(JSON.stringify(ticket))
}