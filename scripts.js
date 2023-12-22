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

const bookmarks = [{"id":"rJwwrvFHrqmqn9Gw","label":"reddit","bookmarks":[{"id":"1Qbrdzo8whamICXT","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"DyoQUVCFEzdFzPp4","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"0oFxm6a3oRPxlZnz","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"oyfbNAdUwJDQMYy2","label":"design tools","bookmarks":[{"id":"xEVsrwPMXqshiadh","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"vvgi7aFHNv7xeja2","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"AdHvL9f9ZWj2UB8B","label":"haikei","url":"https://app.haikei.app/"},{"id":"tnBLIUjy29DptXoA","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"CRYfzQEWylsml4Ka","label":"worth reading","bookmarks":[{"id":"1gSCGGe8py4OWq9r","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"pbWCaVn7zobcCn5C","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"pKUBJiLEsbbCML04","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"vjPwNHtT9RyELl0V","label":"sources","bookmarks":[{"id":"yEueA6ocbVdEiMjg","label":"icons","url":"https://feathericons.com/"},{"id":"sYKsDBPMHbgINxiL","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"XQ5T1QIy1YiBsQwF","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"ykexu4MnMTTDIYG3","label":"author","url":"https://prettycoffee.github.io/"}]}]

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
