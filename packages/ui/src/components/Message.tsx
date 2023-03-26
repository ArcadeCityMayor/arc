import { formatTimestamp, truncateString } from '../utils'
import { Zap } from '@tamagui/lucide-icons'
import { Image, Pressable, TouchableOpacity, View } from 'react-native'
import { ChannelMessage } from '../types'
import { saveZap } from 'app/lib/nostr'
import { Button, Paragraph, XStack, YStack } from 'tamagui'

type Props = {
  currentUser: string // pubkey
  message: ChannelMessage
}

export const Message: React.FC<Props> = ({ currentUser, message }) => {
  const userMetadata = {
    name: message.pubkey.slice(0, 10),
    picture: 'https://placekitten.com/200/200',
  }
  const align = message.pubkey === currentUser ? 'flex-end' : 'flex-start'
  const isCurrentUser = message.pubkey === currentUser
  const pic = isCurrentUser
    ? 'https://placekitten.com/201/201'
    : 'https://placekitten.com/200/200'
  const onLongPress = () => {
    saveZap({ eventId: message.id })
  }
  return (
    <Pressable onLongPress={onLongPress} style={{ flex: 1 }}>
      <XStack flex={1} mt={12}>
        {isCurrentUser ? (
          <View style={{ flexGrow: 1, flexShrink: 1 }} />
        ) : (
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 25,
              alignSelf: 'flex-end',
            }}
            source={{ uri: userMetadata?.picture ?? pic }}
          />
        )}
        <YStack
          elevation="$2"
          flexGrow={1}
          flexShrink={1}
          bg={isCurrentUser ? '$backgroundStrong' : '$color4'}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
          borderBottomRightRadius={isCurrentUser ? 0 : 10}
          borderBottomLeftRadius={isCurrentUser ? 10 : 0}
          paddingVertical={3}
          paddingHorizontal={7}
          marginHorizontal={8}
          alignSelf={align}
        >
          <XStack jc="space-between">
            <Paragraph
              color="$color11"
              lineHeight={14}
              fontWeight="700"
              fontSize="$2"
              fontFamily="$body"
            >
              {userMetadata?.name ?? truncateString(message.pubkey, 10)}
            </Paragraph>
            <XStack ai="center" jc="center">
              <Zap color="$orange11" size={14} />
              <Paragraph
                color="$orange11"
                lineHeight={14}
                //   fontWeight="700"
                fontSize="$2"
                fontFamily="$body"
                mt={1}
                ml={1}
              >
                {message.sats_zapped}
              </Paragraph>
            </XStack>
          </XStack>
          <Paragraph
            mt={2}
            color="$color12"
            fontSize="$2"
            lineHeight={16}
            fontFamily="$body"
          >
            {message.content}
          </Paragraph>
          <Paragraph
            mt={1}
            color="$color9"
            lineHeight={14}
            fontSize={10}
            textAlign="right"
            fontFamily="$body"
          >
            {formatTimestamp(message.created_at.toString())}
          </Paragraph>
        </YStack>
        {isCurrentUser ? (
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 25,
              alignSelf: align,
            }}
            source={{ uri: userMetadata?.picture ?? pic }}
          />
        ) : (
          <></>
        )}
      </XStack>
    </Pressable>
  )
}
