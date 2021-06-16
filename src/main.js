const endpoint = 'https://api.spotify.com'
const apiVersion = '1'

const getEndpoint = (path = '') => `${endpoint}/v${apiVersion}/${path}`
const getAPI = (path = '') => fetch(getEndpoint(path)).then(data => data.json())

export const search = (query, type) => getAPI(`search?q=${query}&type=${type}`)
export const searchArtists = () => {}
export const searchAlbums = () => {}
export const searchTracks = () => {}
export const searchPlaylists = () => {}

export default {
  search,
  searchAlbums,
  searchTracks,
  searchPlaylists,
}
