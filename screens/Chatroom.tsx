import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import FullScreenGradient from '../components/FullScreenGradient'
import { GradientButton } from '../components/GradientButton'
import { palette } from '../lib/palette'

const ChatRoomScreen = () => {
  return (
    <View style={styles.container}>
      <FullScreenGradient colors={[palette.bg, '#2C1837']} start={[0, 0.8]} end={[0, 1]} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat Room</Text>
      </View>
      <ScrollView style={styles.messagesContainer}>
        <View style={styles.message}>
          <Text style={styles.messageText}>Hey, how's it going?</Text>
        </View>
        <View style={styles.message}>
          <Text style={styles.messageText}>I'm doing well, thanks for asking.</Text>
        </View>
        <View style={styles.message}>
          <Text style={styles.messageText}>What have you been up to lately?</Text>
        </View>
        <GradientButton />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  header: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.bg,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#1C171D',
    borderRadius: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
    // Android monospace font
    fontFamily: 'monospace',
  },
})

export default ChatRoomScreen
