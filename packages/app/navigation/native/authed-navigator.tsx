import { ProfileScreen } from 'app/features/profile'
import { XStack } from '@my/ui'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BarChart, MessageCircle, User, UserCog } from '@tamagui/lucide-icons'
import { ChatNavigator } from './chat-navigator'

const BottomTab = createBottomTabNavigator<{
  chat: undefined
  profile: undefined
}>()

const activeTabColor = '$color11'
const inactiveTabColor = '$color8'

export function AuthedNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="profile"
      screenOptions={{
        // hide the tabbar only on the ChannelScreen
        // tabBarStyle: ({ route }) => {
        //   console.log('ROUTE?', route)
        //   return route.name === 'channel' ? { height: 0 } : {}
        // },

        headerShown: false,
        tabBarLabel: () => null,
        // tabBarStyle: { height: 0 },
        tabBarBackground: () => (
          <XStack
            f={1}
            backgroundColor="$backgroundSoft"
            borderTopWidth="$1"
            borderTopColor="$color3"
            elevation="$6"
          />
        ),
      }}
    >
      <BottomTab.Screen
        name="chat"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <MessageCircle color={focused ? activeTabColor : inactiveTabColor} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <User color={focused ? activeTabColor : inactiveTabColor} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  )
}
