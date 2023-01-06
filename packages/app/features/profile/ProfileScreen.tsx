import { Screen } from 'app/views'
import { Avatar, Button, Image, LinearGradient, Paragraph, Text, XStack, YStack } from '@my/ui'
import { MessageSquare, Zap } from '@tamagui/lucide-icons'

export const ProfileScreen = () => {
  return (
    <Screen>
      <YStack width="100%" bg="$color8" height={110}>
        <Image src="https://source.unsplash.com/random/800x606" width="100%" height="100%" />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
          style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 110, zIndex: 200 }}
        />
      </YStack>
      <Avatar circular size={120} mt={-60} ml="$3" borderWidth={2} borderColor="$color3">
        <Avatar.Image src="https://i.pravatar.cc/150?img=23" />
        <Avatar.Fallback bc="$background" />
      </Avatar>
      <XStack space="$3" justifyContent="flex-end" mt={-45} mr="$3">
        <Button size="$3" circular icon={<Zap />}></Button>
        <Button size="$3" circular icon={<MessageSquare />}></Button>
        <Button size="$3">Follow</Button>
      </XStack>

      <YStack p="$4">
        <Paragraph size="$6">nikki ⚡</Paragraph>
        <Paragraph size="$3" color="$color9" mt={-4}>
          @almosthuman
        </Paragraph>

        <Paragraph size="$2" lineHeight="$1" mt="$2">
          I'm a software engineer and a designer. I love to build things that make people's lives
          easier.
        </Paragraph>

        <XStack mt="$2" alignItems="center" justifyContent="space-evenly" space="$2">
          <Paragraph size="$2" color="$color8">
            <Text fontWeight="700" color="$color11">
              392
            </Text>{' '}
            Following
          </Paragraph>
          <Paragraph size="$2" color="$color8">
            <Text fontWeight="700" color="$color11">
              4123
            </Text>{' '}
            Followers
          </Paragraph>
          <Paragraph size="$2" color="$color8">
            <Text fontWeight="700" color="$color11">
              5
            </Text>{' '}
            Relays
          </Paragraph>
        </XStack>

        <XStack mt="$3" space="$3" pt="$1" borderRadius="$2">
          <Avatar size="$3" circular>
            <Avatar.Image src="https://i.pravatar.cc/150?img=2" />
          </Avatar>
          <YStack bg="$color4" p="$3" space="$2">
            <XStack space="$2">
              <Paragraph size="$3" fontWeight="700">
                John Doe
              </Paragraph>
              <Paragraph size="$2" color="$color8">
                @johndoe
              </Paragraph>
              <Paragraph size="$2" color="$color8" ml={-2}>
                • 2m
              </Paragraph>
            </XStack>
            <Paragraph size="$2">
              Just tried the new pizza place in town and it was amazing! Definitely recommend it.
            </Paragraph>
          </YStack>
        </XStack>
      </YStack>
    </Screen>
  )
}
