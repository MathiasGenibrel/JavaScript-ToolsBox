export class fetcher {
  /**
   * Fetch data to Api
   * @param {String} url - Url to fetch data -- **GET** / **POST** / **PUT** / **DELETE**
   * @param {String} token - Authentification Token (optionnal)
   *
   * @example
   * const user = new fetcher("https://www.url.com/api")
   * user.get()
   * user.getOne(path)
   * user.post("json", body)
   * user.put("json", body)
   * user.delete("json", body)
   *
   * @author Mathias Genibrel © 2021
   */
  constructor(url, token) {
    this.url = url;
    this.token = token;
  }

  /**
   * Create Header Content-Type && Bearer Token - ⚠️ don't use it without a fetch method ⚠️
   * @param {String} type - type of data send
   * @param {String} token - Bearer Token for Authentification
   * @param {Array.Object} data - Only for the type === files, to obtain the type automatically
   * @returns Headers completed
   */
  headers(type, token = this.token ?? null, data) {
    let headers = {};

    if (!type) throw "type is undefined or null";

    if (typeof token !== "string" && token) throw "token is not a string";
    if (token) headers["Authorization"] = `Bearer ${token}`;

    if (type.toLowerCase() === "json")
      headers["Content-Type"] = "application/json";

    if (type.toLowerCase() === "markdown")
      headers["Content-Type"] = "text/markdown";
    if (type.toLowerCase() === "text") headers["Content-Type"] = "text/plain";

    if (type.toLowerCase() === "file") headers["Content-Type"] = data[0].type;

    if (type.toLowerCase() === "form-data")
      headers["Content-Type"] = "multipart/form-data";

    if (!headers["Content-Type"]) throw `Missing "Content-Type" in Headers`;
    return headers;
  }

  /**
   * Create the body for the fetch request - ⚠️ don't use it without a fetch method ⚠️
   * @param {String} type - type of send data
   * @param {Array.Object} data
   * - Type === "form-data" => send an Array ***[{key: 1, value: 1}, {key: 2, value: 2}, {...}]***
   * - Type === "json" => send an Object ***{id: 1, name: John, age: 23}***
   * - Type === "markdown" => send an Object ***"# Markdown"***
   * - Type === "text" => send an Object ***"text"***
   * - Type === "file" => send an Object ***file here === [File]***
   * @param {Boolean} empty - set **true** if you need to send a request with empty body
   * @returns Data ready to send
   */
  body(type, data, empty) {
    if (empty) return;
    if (!type || !data) throw "Type || Data is empty";
    if (Object.keys(data).length === 0) throw "Data is empty";
    if (type === "json") {
      try {
        return JSON.stringify(data);
      } catch (error) {
        throw error;
      }
    }

    if (type === "form-data") {
      let formdata = new FormData();
      try {
        data.forEach((element) => {
          formdata.append(element.key, element.value);
        });

        return formdata;
      } catch (e) {
        throw e;
      }
    }

    if (type === "text") {
      if (typeof data !== "string") throw "Data have an empty string";
      return data;
    }

    if (type === "file" || type === "markdown") {
      return data;
    }
    throw "Type is incorrect";
  }

  /**
   * Send the info to an URL
   * @param {String} type - type of sended data -- **JSON / FORM-DATA / FILE / MARKDOWN / TEXT **
   * @param {*} data - Item to send
   * @param {String} token - Bearer token **If you put the authentication token when creating the fetcher, you don't need to specify it here**
   * @param {Boolean} emptyBody - set **true** if you need to send a request with empty body
   * @returns Response of promise
   */
  async post(type, data, token = this.token, emptyBody) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: this.headers(type, token, data),
      body: this.body(type, data, emptyBody),
      redirect: "follow",
    });

    return response;
  }

  /**
   * Retrieve the info of an element
   * @param {String} token Bearer token **If you put the authentication token when creating the fetcher, you don't need to specify it here**
   * @returns Response of promise
   */
  async get(token = this.token) {
    const response = await fetch(this.url, {
      method: "GET",
      headers: this.headers(type, token),
      redirect: "follow",
    });

    return response;
  }

  /**
   * Retrieve the info of an element according to its id or its path
   * @param {String} path - Url path or param => url**\/myPath/folder/file** || url**\?id=1**
   * @param {String} token - Bearer token **If you put the authentication token when creating the fetcher, you don't need to specify it here**
   * @returns Response of promise
   */
  async getOne(path, token = this.token) {
    const response = await fetch(`${this.url}${path}`, {
      method: "GET",
      headers: this.headers(type, token),
      redirect: "follow",
    });

    return response;
  }

  /**
   * Modify data
   * @param {String} type - type of sended data -- **JSON / FORM-DATA / FILE / MARKDOWN / TEXT **
   * @param {*} data - Item to send
   * @param {String} token - Bearer token **If you put the authentication token when creating the fetcher, you don't need to specify it here**
   * @param {Boolean} emptyBody - set **true** if you need to send a request with empty body
   * @returns Response of promise
   */
  async put(type, data, token = this.token, emptyBody) {
    const response = await fetch(this.url, {
      method: "PUT",
      headers: this.headers(type, token, data),
      body: this.body(type, data, emptyBody),
      redirect: "follow",
    });

    return response;
  }

  /**
   * Delete data
   * @param {String} type - type of sended data -- **JSON / FORM-DATA / FILE / MARKDOWN / TEXT **
   * @param {*} data - Item to delete
   * @param {String} token - Bearer token **If you put the authentication token when creating the fetcher, you don't need to specify it here**
   * @param {Boolean} emptyBody - set **true** if you need to send a request with empty body
   * @returns Response of promise
   */
  async delete(type, data, token = this.token, emptyBody) {
    const response = await fetch(this.url, {
      method: "DELETE",
      headers: this.headers(type, token, data),
      body: this.body(type, data, emptyBody),
      redirect: "follow",
    });

    return response;
  }
}
