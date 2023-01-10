// @ts-nocheck

import { parseHexstr, parseNostrRefUri } from '../nostr/NostrLink'
import { bech32Decode } from '../nostr/bech32'
import { consumeUntil, parseChar, Parser } from '../util/parser'
import { parsePostTextBlock, PostBlock } from './postblock'
import { MentionType, ReferencedId } from './types'

export const parsePostMentionType = (p: string): MentionType | null => {
  if (p[0] === '@') {
    return { ref: 'pubkey' }
  }

  if (p[0] === '&') {
    return { ref: 'event' }
  }

  return null
}

export const parsePostReference = (p: string): ReferencedId | null => {
  //   const start = p.pos

  const typ = parsePostMentionType(p)
  if (typ) {
    const ref = parsePostMention(p, typ)
    if (ref) {
      return ref
    }
  }

  return parseNostrRefUri(p)
}

const isBech32Char = (c: string): boolean => {
  return 'qpzry9x8gf2tvdw0s3jn54khce6mua7l'.includes(c)
}

export const parsePostMention = (
  p: string,
  mentionType: MentionType
): ReferencedId | null => {
  const hexId = parseHexstr(p, 64)
  if (hexId) {
    return { refId: hexId, relayId: null, key: mentionType.ref }
  }

  const bech32Ref = parsePostBech32Mention(p)
  if (bech32Ref) {
    return bech32Ref
  }

  return null
}

function parsePostBech32Mention(p: Parser): ReferencedId | null {
  const start = p.pos
  let hrp = ''
  if (p.str.startsWith('note', p.pos)) {
    hrp = 'note'
  } else if (p.str.startsWith('npub', p.pos)) {
    hrp = 'npub'
  } else if (p.str.startsWith('nsec', p.pos)) {
    hrp = 'nsec'
  } else {
    return null
  }

  if (!parseChar(p, '1')) {
    p.pos = start
    return null
  }

  if (!consumeUntil(p, (c) => !isBech32Char(c), true)) {
    return null
  }

  const end = p.pos
  const sliced = p.str.slice(start, end)

  try {
    const decoded = bech32Decode(sliced)
    const hex = hexEncode(decoded.data)

    switch (decoded.hrp) {
      case 'note':
        return { refId: hex, relayId: null, key: 'e' }

      case 'npub':
        return { refId: hex, relayId: null, key: 'p' }

      case 'nsec':
        const pubkey = privkeyToPubkey(hex)
        if (pubkey) {
          return { refId: pubkey, relayId: null, key: 'p' }
        } else {
          p.pos = start
          return null
        }

      default:
        p.pos = start
        return null
    }
  } catch (e) {
    p.pos = start
    return null
  }
}

/**
 * Return a list of tags
 */
// function parsePostBlocks(content: string): PostBlock[] {
//   const p = new Parser(content)
//   const blocks: PostBlock[] = []

//   while (!p.eof()) {
//     let block: PostBlock | null = parsePostTag(p)
//     if (!block) {
//       block = parsePostTextBlock(p)
//     }

//     if (block) {
//       blocks.push(block)
//     }
//   }

//   return blocks
// }

function parsePostTag(p: Parser): PostBlock | null {
  const start = p.pos
  if (!parseChar(p, '#')) {
    return null
  }

  if (
    !consumeUntil(
      p,
      (c) => c === ' ' || c === '\n' || c === '\r' || p.eof(),
      true
    )
  ) {
    p.pos = start
    return null
  }

  const end = p.pos
  const tag = p.str.slice(start + 1, end)
  return { type: 'tag', tag }
}

// function parsePostTextBlock(p: Parser): PostBlock {
//   const start = p.pos

//   if (consumeUntil(p, (c) => !isMentionChar(c), true)) {
//     return {
//       kind: 'text',
//       content: String.substring(p.str, start, p.pos),
//     }
//   } else {
//     p.pos = start
//     return null
//   }
// }

function parsePostMentionBlock(p: Parser, mentionType: MentionType): PostBlock {
  const start = p.pos
  const id = parseHexstr(p, 64)
  const bech32Ref = parsePostBech32Mention(p)

  if (id || bech32Ref) {
    let ref: ReferencedId
    if (id) {
      ref = { refId: id, relayId: null, key: mentionType.ref }
    } else {
      ref = bech32Ref
    }

    return {
      kind: 'reference',
      ref,
    }
  } else {
    p.pos = start
    return null
  }
}

function parsePostHashtagBlock(p: Parser): PostBlock {
  const start = p.pos

  if (parseChar(p, '#')) {
    if (consumeUntil(p, (c) => !isMentionChar(c), true)) {
      return {
        kind: 'hashtag',
        content: String.substring(p.str, start + 1, p.pos),
      }
    }
  }

  p.pos = start
  return null
}

// function parsePostBlock(p: Parser): PostBlock {
//   const start = p.pos
//   const mentionType = parsePostMentionType(p)
//   if (mentionType) {
//     return parsePostMentionBlock(p, mentionType)
//   } else if (parseChar(p, '#')) {
//     return parsePostHashtagBlock(p)
//   } else {
//     return parsePostTextBlock(p)
//   }
// }

// export function parsePostBlocks(content: string): PostBlock[] {
//   const blocks: PostBlock[] = []
//   let currentIndex = 0
//   while (currentIndex < content.length) {
//     const block = parsePostTextBlock(content, currentIndex, content.length)
//     if (block) {
//       blocks.push(block)

//       if (typeof block.value === 'string') {
//         currentIndex += block.value.length
//       } else {
//         currentIndex += block.value.refId.length
//       }
//     } else {
//       currentIndex++
//     }
//   }
//   return blocks
// }

// export function parsePostBlocks(content: string): PostBlock[] {
//   // This function takes in a string of content and returns an array of PostBlock objects
//   const blocks: PostBlock[] = []
//   // Initialize an empty array to store the PostBlock objects
//   let currentIndex = 0
//   // Initialize a variable to keep track of the current index in the content string
//   if (content.length === 0) {
//     // If the content string is empty, return an empty array
//     return []
//   }
//   while (currentIndex < content.length) {
//     // Loop through the content string until the current index is equal to the length of the content string
//     const preMention = currentIndex
//     // Store the current index in a variable
//     const reference = parsePostReference(content, currentIndex)
//     // Parse the content string from the current index to see if it contains a reference
//     if (reference) {
//       // If the content string contains a reference
//       blocks.push(parsePostTextBlock(content, startingFrom, preMention))
//       // Push the result of the parsePostTextBlock function to the blocks array
//       blocks.push(reference)
//       // Push the reference to the blocks array
//       startingFrom = currentIndex
//       // Set the startingFrom variable to the current index
//     } else if (parseHashtag(content, currentIndex)) {
//       // If the content string contains a hashtag
//       blocks.push(parsePostTextBlock(content, startingFrom, preMention))
//       // Push the result of the parsePostTextBlock function to the blocks array
//       blocks.push(parseHashtag(content, currentIndex))
//       // Push the hashtag to the blocks array
//       startingFrom = currentIndex
//       // Set the startingFrom variable to the current index
//     } else {
//       // If the content string does not contain a reference or hashtag
//       currentIndex++
//       // Increase the current index by 1
//     }
//   }
//   blocks.push(parsePostTextBlock(content, startingFrom, content.length))
//   // Push the result of the parsePostTextBlock function to the blocks array
//   return blocks
//   // Return the blocks array
// }

export function parsePostBlocks(content: string): PostBlock[] {
  const p = new Parser(0, content)
  const blocks: PostBlock[] = []
  while (!p.done()) {
    const block = parsePostTextBlock(p.str, p.pos, p.str.length)
    if (block) {
      blocks.push(block)
      p.pos += block.value.length
    } else {
      break
    }
  }
  return blocks
}
