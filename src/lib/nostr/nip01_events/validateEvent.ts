import {
  Event,
  validateEvent as validateEventFromNostrTools,
} from 'nostr-tools'

import { NostrEvent } from './event'

export function validateEvent(event: NostrEvent) {
  if (event.kind < 0 || event.created_at < 0) {
    return false
  }
  return validateEventFromNostrTools(event as Event)
}
