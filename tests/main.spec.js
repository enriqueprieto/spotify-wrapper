import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'
chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

import { search, searchArtists, searchAlbums, searchTracks, searchPlaylists } from '../src/main'


describe('Main', () => {
  describe('Smoke tests', () => {
    it('should exist the search method.', () => {
      expect(search).to.exist
    })

    it('should exist the searchArtists method.', () => {
      expect(searchArtists).to.exist
    })

    it('should exist the searchAlbums method.', () => {
      expect(searchAlbums).to.exist
    })

    it('should exist the searchTracks method.', () => {
      expect(searchTracks).to.exist
    })

    it('should exist the searchPlaylists method.', () => {
      expect(searchPlaylists).to.exist
    })
  })

  describe('Generic Search', () => {
    let fetchStub
    let promise

    beforeEach(() => {
      fetchStub = sinon.stub(global, 'fetch')
      promise = fetchStub.resolves()
    })

    afterEach(() => {
      fetchStub.restore()
    })

    it('should call fetch function', () => {
      // eslint-disable-next-line no-unused-vars
      const artists = search()

      expect(fetchStub).to.have.been.calledOnce
    })

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        // eslint-disable-next-line no-unused-vars
        const artists = search('Incubus', 'artist')

        expect(fetchStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist')

        // eslint-disable-next-line no-unused-vars
        const albums = search('Incubus', 'album')

        expect(fetchStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album')
      })

      context('passing more than one types', () => {
        // eslint-disable-next-line no-unused-vars
        const artistsAndAlbums = search('Incubus', ['artist', 'album'])

        expect(fetchStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album')
      })
    })

    it('should return JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' })
      const artists = search('Incubus', 'artist')
      console.log(artists)
      console.log(artists.resolveValues)

      expect(artists.resolveValues).to.be.eql({ body: 'json' })
    })
  })
})
