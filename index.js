const image_urls = require("./data/image_url")
const names = require("./data/names")
const text = require("./data/text")

const types = [
  "name", "text", "user_description", "image_url", "month", "date"
]

const randomFrom = (array) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const get = {
  "name": () => randomFrom(names),
  "text": text,
  "user_description": () => randomFrom([
    "Eu sou um rapazinho, embora pequenino, tenho muito tino",
    "1m70 turpima é minha e adoro a minha vida",
    "sem bio dud",
    "mais random shit description",
    "é lidar, a vida sorri aos que trabalham (no macdonalds)",
  ]),
  "image_url": () => randomFrom(image_urls),
}
const parseSchema = (schema) => {
  let result = {}
  for (let key in schema) {
    if (typeof (schema[key]) === typeof ({}))
      result[key] = populate_me(schema[key])
    else {
      result[key] = get[schema[key]]();
    }
  }
  return result
}

const populate_me = (request) => {
  let result = [];
  for (let i = 0; i < request.count; i++) {
    result.push(parseSchema(request.schema))
  }
  return result
}

module.exports = populate_me