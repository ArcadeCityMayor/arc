import { AnimatedFlashList } from '@shopify/flash-list'
import { CircleDot, CircleSlashed } from '@tamagui/lucide-icons'
import { useLongPress } from 'lib/hooks'
import { DEFAULT_RELAYS } from 'lib/constants/relays'
import { useRelayPool } from 'lib/nostr/relaypool/useRelayPool'
import { Alert, TouchableOpacity } from 'react-native'
import { RelayInfo } from 'stores/relay'
import { ListItem, Separator, Switch, Text, XStack, YStack } from 'tamagui'

import { AddRelay } from './AddRelay'
import { useStore } from 'app/stores'

export const RelayManager = () => {
  const { relays, relayPool } = useRelayPool(DEFAULT_RELAYS)
  const removeRelay = useStore((state) => state.relayActions.removeRelay)
  const { onPressIn, onPressOut, target } = useLongPress((props) => {
    console.log('props here?', props)
    Alert.alert(
      `Delete ${target}`,
      `Are you sure you want to delete this relay?`,
      [
        {
          text: 'No, cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, delete',
          onPress: () => {
            relayPool?.closeRelay(target)
            removeRelay(target)
          },
        },
      ]
    )
  })

  return (
    <AnimatedFlashList
      ListHeaderComponent={
        <YStack pt={70}>
          <XStack px="$4" justifyContent="space-between" alignItems="center">
            <Text color="$color12" fontSize={18} fontWeight="700">
              Relays ({relays.length})
            </Text>
            <AddRelay />
          </XStack>
          <Separator mt="$4" mb="$2" />
        </YStack>
      }
      estimatedItemSize={150}
      data={relays}
      renderItem={({ item }: { item: RelayInfo }) => (
        <TouchableOpacity
          onPress={() => console.log('uhoh')}
          onLongPress={() => console.log('HMMMM')}
        >
          <ListItem
            onPressIn={() => onPressIn(item.url)}
            onPressOut={() => onPressOut()}
            pressTheme
            title={item.url}
            subTitle={item.status}
            icon={
              item.status === 'connected' ? (
                <CircleDot color="green" size={20} />
              ) : (
                <CircleSlashed
                  color={
                    item.status === 'not-connected' ||
                    item.status === 'connecting'
                      ? 'yellow'
                      : 'red'
                  }
                  size={20}
                />
              )
            }
            iconAfter={
              <Switch
                size="$2"
                checked={
                  item.status === 'connected' || item.status === 'connecting'
                }
                onCheckedChange={(checked: boolean) => {
                  if (checked) {
                    relayPool?.closeRelay(item.url)
                    relayPool?.addOrGetRelay(item.url)
                  } else {
                    relayPool?.closeRelay(item.url)
                  }
                }}
              >
                <Switch.Thumb animation="quick" />
              </Switch>
            }
          />
        </TouchableOpacity>
      )}
    />
  )
}
