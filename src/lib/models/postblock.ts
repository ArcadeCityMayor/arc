import { ReferencedId } from './types'

export type PostBlock =
  | { type: 'text'; value: string }
  | { type: 'ref'; value: ReferencedId }
  | { type: 'hashtag'; value: string }

export const parsePostTextBlock = (
  str: string,
  from: number,
  to: number
): PostBlock | null => {
  return { type: 'text', value: str.substring(from, to) }
}
