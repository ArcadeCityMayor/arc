import { HEX_PRIVKEY_STORAGE_KEY, HEX_PUBKEY_STORAGE_KEY } from 'app/lib/constants'
import * as storage from 'app/lib/storage'
import { generateRandomPlacekitten, timeNowInSeconds } from 'app/lib/utils'
import { getEventHash, getPublicKey, nip19, signEvent } from 'nostr-tools'
import { login, logout } from './authActions'

export interface AuthState {
  isLoggedIn: boolean
  user: {
    name: string
    publicKey: string
    privateKey: string
  }
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    name: '',
    publicKey: '',
    privateKey: '',
  },
}

export const createAuthStore = (set: any, get: any) => ({
  isLoggedIn: initialState.isLoggedIn,
  user: initialState.user,
  login: async (name: string) => set(await login(name)), // old
  loginWithNsec: async (nsec: string) => {
    if (!nsec.startsWith('nsec1') || nsec.length < 60) {
      return
    }
    try {
      const { data } = nip19.decode(nsec)
      const privateKey = data as string
      const publicKey = getPublicKey(privateKey)
      console.log('Decoded publicKey: ', publicKey)
      await storage.setItem(HEX_PUBKEY_STORAGE_KEY, publicKey)
      await storage.setItem(HEX_PRIVKEY_STORAGE_KEY, privateKey)
      console.log('Keys saved to local storage')
      set({ isLoggedIn: true, user: { name: '', publicKey, privateKey } })
    } catch (e) {
      alert('Invalid key. Did you copy it correctly?')
    }
  },
  logout: async () => set(await logout()),
  signup: async (username, displayName, about) => {
    // Get the current state
    const state = get()

    // Get the public and private keys of the authed user
    let { publicKey, privateKey } = state.user

    if (!publicKey || !privateKey || publicKey === '' || privateKey === '') {
      console.log('no pub and priv')
      let keys = await login('')
      publicKey = keys.user.publicKey
      privateKey = keys.user.privateKey
    }

    // Get relays from the state
    const { relays } = state

    const metadata = {
      name: username,
      displayName,
      about,
      picture: generateRandomPlacekitten(),
      website: null,
    }

    const event: any = {
      content: JSON.stringify(metadata),
      created_at: timeNowInSeconds(),
      kind: 0,
      pubkey: publicKey,
      tags: [],
    }

    // Set the id and sig properties of the event
    event.id = getEventHash(event)
    event.sig = signEvent(event, privateKey)

    // Publish the event to all of the relays
    relays.forEach((relay) => {
      //   console.log('Publishing to relay: ', relay.url)
      let pub = relay.publish(event)
      pub.on('ok', () => {
        // console.log(`${relay.url} has accepted our event`)
        set({ user: { ...state.user, privateKey, publicKey } })
        // console.log('set user to', { ...state.user, privateKey, publicKey })
      })
      pub.on('seen', () => {
        console.log(`we saw the event on ${relay.url}`)
      })
      pub.on('failed', (reason) => {
        console.log(`failed to publish to ${relay.url}: ${reason}`)
      })
    })
  },
})

export interface SignupProps {
  username: string
  displayName?: string
  about?: string
}
