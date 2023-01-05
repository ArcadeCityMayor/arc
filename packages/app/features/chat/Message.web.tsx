import { formatTimestamp, generateRandomPlacekitten, truncateString } from 'app/lib/utils'
import { useStore } from 'app/stores'
import { ChatMessage } from 'app/stores/chat'
import { Image, View } from 'react-native'
import { palette, Paragraph as Text, Stack, YStack } from '@my/ui'

type Props = {
  message: ChatMessage
}

export const Message: React.FC<Props> = ({ message }) => {
  const currentUser = useStore((state) => state.user.publicKey)
  const align = message.sender === currentUser ? 'flex-end' : 'flex-start'
  const isCurrentUser = message.sender === currentUser
  const pic = isCurrentUser ? 'https://placekitten.com/201/201' : 'https://placekitten.com/200/200'
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginTop: 12 }}>
      {isCurrentUser ? (
        <View style={{ flexGrow: 1, flexShrink: 1 }} />
      ) : (
        <Image
          style={{ width: 30, height: 30, borderRadius: 25, alignSelf: 'flex-end' }}
          source={{ uri: pic }}
        />
      )}
      <YStack
        elevation={'$2'}
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
        <Text
          color="$color11"
          style={{
            fontWeight: '700',
            fontSize: 12,
            fontFamily: 'Inter',
            // lineHeight: 14,
          }}
        >
          {truncateString(message.sender, 10)}
        </Text>
        <Text
          mt={2}
          color="$color12"
          style={{
            fontSize: 12,
            // lineHeight: 16,
          }}
        >
          {message.text}
        </Text>
        <Text
          mt={1}
          color="$color8"
          style={{
            fontSize: 10,
            textAlign: 'right',
            fontFamily: 'Inter',
            // lineHeight: 14,
          }}
        >
          {formatTimestamp(message.timestamp)}
        </Text>
      </YStack>
      {isCurrentUser ? (
        <Image
          style={{ width: 30, height: 30, borderRadius: 25, alignSelf: align }}
          source={{ uri: pic }}
        />
      ) : (
        <></>
      )}
    </View>
  )
}
