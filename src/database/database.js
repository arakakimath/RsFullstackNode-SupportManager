import fs from "node:fs/promises"

const DATABASE_PATH = new URL("db.json", import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(DATABASE_PATH, "utf8")
    .then((data) => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table]))
      this.#database[table].push(data)
    else
      this.#database[table] = [data]

    this.#persist()

    return data
  } 

  select(table, filters) {
    let data = this.#database[table] ?? []

    if (filters) {
      data = data.filter((ticket) => {
        console.log(Object.entries(filters))
        return Object.entries(filters).reduce( (condition, [key, value]) => {
          return ticket[key].toLowerCase().includes(value.toLowerCase()) && condition
        }, true)
      })
    }

    return data
  }
}