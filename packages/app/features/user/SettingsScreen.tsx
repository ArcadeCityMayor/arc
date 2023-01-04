import { useStore } from 'app/stores'
import { BackButton, LogoutDialog, Screen } from 'app/views'
import * as Clipboard from 'expo-clipboard'
import { npubEncode, nsecEncode } from 'nostr-tools/nip19'
import { H2, isWeb, Label, ListItem, Separator, YGroup, YStack } from '@my/ui'
import { Clipboard as ClipboardIcon, Key, User } from '@tamagui/lucide-icons'
import { ThemePicker } from './ThemePicker'

export const SettingsScreen = () => {
  const publicKey = useStore((s) => s.user.publicKey)
  const privateKey = useStore((s) => s.user.privateKey)

  const npubkey = npubEncode(publicKey)
  const nseckey = nsecEncode(privateKey)
  const mask = '*'.repeat(nseckey.length - 'nsec1'.length)
  const maskedNsec = `nsec1${mask}`

  const copyPublicKey = async () => {
    await Clipboard.setStringAsync(npubkey)
    alert('Public key copied to clipboard!')
  }

  const copyPrivateKey = async () => {
    await Clipboard.setStringAsync(nseckey)
    alert('Secret key copied to clipboard!')
  }

  return (
    <Screen>
      <YStack alignItems="center" m="$4">
        <YGroup
          als="center"
          bordered
          w="100%"
          size="$5"
          maxWidth={isWeb ? '50%' : '100%'}
          separator={<Separator />}
        >
          <ListItem
            hoverTheme
            pressTheme
            title="Public Account ID"
            subTitle={npubkey}
            icon={User}
            iconAfter={ClipboardIcon}
            onPress={copyPublicKey}
          />
          <ListItem
            hoverTheme
            pressTheme
            title="Secret Account Login Key"
            subTitle={maskedNsec}
            icon={Key}
            iconAfter={ClipboardIcon}
            onPress={copyPrivateKey}
          />
        </YGroup>
        <ThemePicker />
        <LogoutDialog mt="$6" w={200} />
      </YStack>
    </Screen>
  )
}
