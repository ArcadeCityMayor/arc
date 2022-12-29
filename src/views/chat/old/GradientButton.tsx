import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ACTIVE_OPACITY, typography } from 'views/theme'

export const GradientButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={ACTIVE_OPACITY}>
      <LinearGradient
        colors={['#921DFB', '#4C08A4']}
        start={[0, 0]}
        end={[0, 1]}
        style={styles.gradient}>
        <Text style={styles.buttonText}>Get Started</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    // fontWeight: 'bold',
    fontSize: 18,
    fontFamily: typography.bold,
  },
})
