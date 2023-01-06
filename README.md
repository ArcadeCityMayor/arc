# Arc

A cross-platform [Nostr](https://github.com/nostr-protocol/nostr) chat client, currently pre-alpha.

Focuses first on implementing [NIP-28](https://github.com/nostr-protocol/nips/blob/master/28.md) for a Telegram-like experience.

We use [React Native](https://reactnative.dev/), [Expo](https://expo.dev/), and [Tamagui](https://tamagui.dev/) to target Android, iOS & web with one codebase.

The `main` branch is automatically deployed to [alpha.thearcapp.com](https://alpha.thearcapp.com). It may or may not be usable.

Follow [@TheArcApp on Twitter](https://twitter.com/TheArcApp) for updates.

|                                                                                                                                           |                                                                                                                                             |                                                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="700" alt="login" src="https://user-images.githubusercontent.com/14167547/210706813-2eccfe72-3d7f-4965-9516-d0f3436d8672.png"> | <img width="700" alt="profile" src="https://user-images.githubusercontent.com/14167547/210916398-663c44af-7a42-470a-8151-c86320e1279f.png"> | <img width="700" alt="web" src="https://user-images.githubusercontent.com/14167547/210707165-4a7af9e0-4e85-46fb-9f9c-6c8279b27817.png"> |

## Features

Current and upcoming features in order of priority:

- [x] Read and send messages to [NIP-28](https://github.com/nostr-protocol/nips/blob/master/28.md) channels ([#22](https://github.com/ArcadeLabsInc/arc/pull/22))
- [x] Account creation ([#23](https://github.com/ArcadeLabsInc/arc/pull/23))
- [x] Log in with nsec ([#23](https://github.com/ArcadeLabsInc/arc/pull/23))
- [x] Key backup ([#23](https://github.com/ArcadeLabsInc/arc/pull/23))
- [x] Pick UI theme ([#23](https://github.com/ArcadeLabsInc/arc/pull/23))
- [x] Show user kind-0 name & picture ([#25](https://github.com/ArcadeLabsInc/arc/pull/25))
- [ ] Twitter-style profiles
- [ ] Display [NIP-05](https://github.com/nostr-protocol/nips/blob/master/05.md) identifiers
- [ ] Look up user by NIP-05 identifier
- [ ] Contact lists ([NIP-02](https://github.com/nostr-protocol/nips/blob/master/02.md))
- [ ] Follower/following feed
- [ ] Muting
- [ ] Global feed
- [ ] Click to copy any user's npub
- [ ] Reactions ([NIP-25](https://github.com/nostr-protocol/nips/blob/master/25.md))
- [ ] Display URLs as clickable links
- [ ] Display images from people you follow
- [ ] Mentions ([NIP-08](https://github.com/nostr-protocol/nips/blob/master/08.md))
- [ ] Log in via web extension ([NIP-07](https://github.com/nostr-protocol/nips/blob/master/07.md))
- [ ] Add/remove/recommend relays
- [ ] Unread channel messages
- [ ] Internationalization
- [ ] Display/pay Lightning invoices
- [ ] Search messages and feeds
- [ ] Create channels
- [ ] Pinned channel messages
- [ ] Encrypted DMs ([NIP-04](https://github.com/nostr-protocol/nips/blob/master/04.md))
- [ ] Push notifications
- [ ] Channel invites
- [ ] Reposts ([NIP-08](https://github.com/nostr-protocol/nips/blob/master/18.md))
- [ ] Emojis
- [ ] Lightning wallets via [LNbits](https://lnbits.com/)
- [ ] Paid DMs
- [ ] Channel moderators
- [ ] Private group chats ([NIP-38?](https://github.com/nostr-protocol/nips/pull/59))
- [ ] Each note/post has its own web URL
- [ ] Reputation ([NIP-32](https://github.com/nostr-protocol/nips/pull/46))
- [ ] UI theme marketplace
- [ ] Marketplace listings
- [ ] Voice messages
- [ ] Audio rooms
- [ ] Video chat
- [ ] E-commerce shops
- [ ] Bots
- [ ] Developer API

[Tweet us](https://twitter.com/TheArcApp) any feature requests.

## Architecture

Documenting on our wiki:

- [Authentication](https://github.com/ArcadeLabsInc/arc/wiki/Authentication)

## Running locally

This is pre-alpha and very little works. But if you like bugs and pain, here are the basics:

1. `git clone git@github.com:ArcadeLabsInc/arc.git`
2. `cd arc`
3. `yarn install`
4. `yarn web` or `yarn native`

Consult the [Expo docs](https://docs.expo.dev/) for more details on environment setup, running on device or emulator, and building your own version via EAS.

To learn the basics of React Native, see this author's [React Native Lightning wallet workshop](https://arcadelabs.co/articles/intro-to-react-native).
