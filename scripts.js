/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"KBRuQgGYnUJCs91I","label":"Universidad","bookmarks":[{"id":"TclTJ09i8KaNJpOx","label":"UbuVirtual","url":"https://ubuvirtual.ubu.es/"},{"id":"oGxcvsQZFWhxQceu","label":"ChatGPT","url":"https://chat.openai.com/"},{"id":"WeSFybnF2OGhsjC4","label":"Outlook","url":"https://outlook.office.com/mail/?actSwt=true"},{"id":"d7wrdvVcpTw9l5mz","label":"Excalidraw","url":"https://excalidraw.com/"}]},{"id":"XLLnvpknDMsvcwyq","label":"RR.SS.","bookmarks":[{"id":"1k9VswpcJ03LLU19","label":"Reddit","url":"https://www.reddit.com/"},{"id":"EwhE3jJRoeezjHwU","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"C5pgFMRrbmEtVj2y","label":"Twitter","url":"https://twitter.com/?lang=es"},{"id":"CxvFDWfDhxyCO9TM","label":"Instagram","url":"https://www.instagram.com/"}]},{"id":"XiySv3JMt7sKPQHv","label":"Informática","bookmarks":[{"id":"V2CMCOwE7aB00oHq","label":"Arch Wiki","url":"https://monkeytype.com/"},{"id":"dalDCGGiAGCwdUJq","label":"GitHub","url":"https://github.com/"},{"id":"xaOwnPoQagzNzZy7","label":"V4ld-i","url":"https://github.com/V4ld-i"},{"id":"m9fM8n0bHBwIxCZp","label":"Road Maps","url":"https://roadmap.sh/"}]},{"id":"7kPA5K9PKR9rJlWY","label":"Otros","bookmarks":[{"id":"OBOcvAXcGkIqbA0b","label":"Monkeytype","url":"https://monkeytype.com/"},{"id":"ShWmyaksU81wPPW5","label":"LaTex","url":"https://manualdelatex.com/"},{"id":"6hw90dwnPyMVyjV7","label":"TMO","url":"https://visortmo.com/"},{"id":"ymMNmaoKUvJatVjr","label":"Gmail","url":"https://mail.google.com/mail/u/0/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
