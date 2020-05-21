export function fetchGeneric(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((response) => {
      if (response.error) {
        throw response.error
      }
      return response
    })
    .catch((error) => {
      console.error('error on url', error)
      return { error: true }
    })
}
