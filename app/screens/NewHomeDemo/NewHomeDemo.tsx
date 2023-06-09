import React from "react"
import { StatusBar } from "expo-status-bar"
import { ScrollView, StyleSheet, View } from "react-native"
import Chat from "app/components/icons/chat.svg"
import Profile from "app/components/icons/profile.svg"
import Settings from "app/components/icons/settings.svg"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Animated, { FadeInDown } from "react-native-reanimated"
import { ChannelDetail } from "app/components/ChannelDetail"

export const NewHomeDemo = () => {
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <StatusBar style="light" />
      <ScrollView style={styles.list}>
        <Animated.View entering={FadeInDown.delay(100).duration(800)}>
          <ChannelDetail
            image={require("../../../assets/images/lobby.png")}
            name="The Lobby"
            lastMessage="Hey I'm going to see how this works"
            lastMessageUsername="Jo"
            lastMessageTime={Date.now() - 180000} // 3 minutes ago
            unreadCount={4}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).duration(800)}>
          <ChannelDetail
            image={require("../../../assets/images/handshake2.png")}
            name="Global Trade"
            lastMessage="WTB Bitcoin"
            lastMessageUsername="satoshi"
            lastMessageTime={Date.now() - 960000} // 16 minutes ago
            unreadCount={28}
          />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(300).duration(800)}>
          <ChannelDetail
            image={require("../../../assets/images/logo-channel.png")}
            name="Arcade Feedback"
            lastMessage="this is cool"
            lastMessageUsername="user123"
            lastMessageTime={Date.now() - 2880000} // 48 minutes ago
            unreadCount={112}
          />
        </Animated.View>
      </ScrollView>
      <Animated.View entering={FadeInDown.delay(500).duration(1000)}>
        <View style={[styles.bottomBar, { bottom: bottom + 10 }]}>
          <Profile style={styles.logo} height={logoSize} width={logoSize} />
          <Chat style={styles.logoActive} height={logoSize} width={logoSize} />
          <Settings style={styles.logo} height={logoSize} width={logoSize} />
        </View>
      </Animated.View>
    </View>
  )
}

const logoSize = 30
const styles = StyleSheet.create({
  bottomBar: {
    alignItems: "center",
    backgroundColor: "rgba(0,24,24,0.65)",
    borderColor: "rgba(0,48,48,0.85)",
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    height: 60,
    justifyContent: "space-around",
    left: "5%",
    position: "absolute",
    width: "90%",
  },
  list: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 2,
    paddingVertical: 10,
  },
  logo: { color: "#155e75" },
  logoActive: { color: "cyan" },
})
