import { fetcher } from "../fetcher.js";

const API = new fetcher("https://jsonplaceholder.typicode.com/");

const test = (test, testName, expectedResult) => {
  try {
    test();
    if (!expectedResult)
      return console.error(
        `%c✖️ Test Failed ${testName}
        error: not catch`,
        "color:red"
      );
    console.log(`%c✔️ Test Passed ${testName}`, "color:green");
  } catch (e) {
    if (!expectedResult)
      return console.log(
        `%c✔️ Test Passed ${testName}
        error: ${e}`,
        "color:green"
      );
    console.error(
      `%c✖️ Test Failed ${testName} 
      error: ${e}`,
      "color:red"
    );
  }
};

test(() => API.headers(), "Empty params", false);
test(() => API.headers("fghjk"), "Bad Content-Type", false);
test(() => API.headers("fghjk", {name: "John"}), "Bad Token", false);
test(() => API.headers("json"), "json Content-Type", true);
test(() => API.headers("text"), "text Content-Type", true);
test(() => API.headers("markdown"), "markdown Content-Type", true);
test(
  () => API.headers("file", "ghjk", []),
  "file Content-Type with empty array",
  false
);
test(
  () => API.headers("file", "ghjk", [{ type: "images/jpeg" }]),
  "file Content-Type",
  true
);

test(() => API.body("fghjb", {}), "Bad Content-Type", false);
test(() => API.body("json", {}), "Empty Object data", false);
test(() => API.body("text", {name: "John"}), "Bad data", false);
test(() => API.body("text", ""), "Empty String data", false);
test(() => API.body("text", "je suis bon"), "Raw data", true);
test(() => API.body("text", "", true), "Empty body, with param = true", true);
test(() => API.body("markdown", "<h1>MARKDOWN</h1>"), "markdown data", true);
test(() => API.body("file", "img:base64"), "file data", true);

test(() => API.post(), "Empty params", false);