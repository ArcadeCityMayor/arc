import { useStore } from 'app/stores'
import { BackButton, LogoutDialog, Screen } from 'app/views'
import { npubEncode, nsecEncode } from 'nostr-tools/nip19'
import useClipboard from 'react-use-clipboard'
import { H2, isWeb, ListItem, Separator, YGroup, YStack } from '@my/ui'
import { Clipboard as ClipboardIcon, Key, User } from '@tamagui/lucide-icons'
import { ThemePicker } from './ThemePicker'

export const SettingsScreen = () => {
  const publicKey = useStore((s) => s.user.publicKey)
  const privateKey = useStore((s) => s.user.privateKey)

  const npubkey = npubEncode(publicKey)
  const nseckey = nsecEncode(privateKey)
  const mask = '*'.repeat(nseckey.length - 'nsec1'.length)
  const maskedNsec = `nsec1${mask}`

  const [isPubCopied, setPubCopied] = useClipboard(npubkey)
  const [isSecCopied, setSecCopied] = useClipboard(nseckey)

  const copyPublicKey = async () => {
    setPubCopied()
    // alert('not implemented on web yet')
    // await Clipboard.setStringAsync(npubkey)
    alert('Public key copied to clipboard!')
  }

  const copyPrivateKey = async () => {
    setSecCopied()
    // alert('not implemented on web yet')
    // await Clipboard.setStringAsync(nseckey)
    alert('Secret key copied to clipboard!')
  }

  return (
    <Screen>
      <BackButton m={40} />
      <H2 textAlign="center" mb="$4">
        Settings
      </H2>
      <YStack alignItems="center">
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
