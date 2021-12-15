export class fetcher {
  /**
   * Fetch data to Api
   * @param {String} url - Url to fetch data -- **GET** / **POST** / **PUT** / **DELETE**
   *
   * @example
   * const user = new fetcher("https://www.url.com/api")
   * user.get()
   * user.getOne(id)
   * user.post("json", body)
   * user.put("json", body)
   * user.delete("json", body)
   * 
   * @author Mathias Genibrel © 2021
   */
  constructor(url) {
    this.url = url;
  }

  headers() {
    if (type === "json") {
      const headers = {
        "Content-Type": "application/json"
      }
    }
  }

  async post(type, body) {
    const response = await fetch(this.url, {
      method: "POST",
      redirect: "follow",
      headers: this.headers(type),
      body: JSON.stringify(body)
    });

    return response;
  }
  async get() {
    const response = await fetch(this.url, {
      method: "POST",
      redirect: "follow",
    });

    return response;
  }
}
