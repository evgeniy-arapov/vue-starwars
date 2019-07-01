export default function (url) {
  const urlArr = url.split("/")
  return urlArr[urlArr.length-2]
}
