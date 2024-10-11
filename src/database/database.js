import fs from "node:fs/promises";

const DATABASE_PATH = new URL("db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(DATABASE_PATH, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) this.#database[table].push(data);
    else this.#database[table] = [data];

    this.#persist();

    return data;
  }

  select(table, filters) {
    let data = this.#database[table] ?? [];

    if (filters) {
      data = data.filter((ticket) => {
        return Object.entries(filters).reduce((condition, [key, value]) => {
          return (
            ticket[key].toLowerCase().includes(value.toLowerCase()) && condition
          );
        }, true);
      });
    }

    return data;
  }

  update(table, id, data) {
    const index = this.#database[table].findIndex((item) => item.id === id);

    if (index > -1) {
      this.#database[table][index] = {
        ...this.#database[table][index],
        ...data,
      };
      this.#persist();

      return true
    }
    else return false
  }

  delete(table, id) {
    const index = this.#database[table].findIndex((item) => item.id === id);

    if (index > -1) {
      this.#database[table].splice(index, 1)
      this.#persist()

      return true
    }
    else return false
  }

}
