export default function (url) {
  return url.split("/").reverse().find(el => parseInt(el))
}
