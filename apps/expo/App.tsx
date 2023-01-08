import 'text-encoding-polyfill'
import 'expo-dev-client'
import { useExpoUpdates } from 'app/lib/useExpoUpdates'
import { NativeNavigation } from 'app/navigation/native'
import { Provider } from 'app/provider'
import { StatusBar } from 'expo-status-bar'
import { LogBox, View } from 'react-native'
import { useCachedResources } from './useCachedResources'

LogBox.ignoreLogs(['Constants.platform.ios.model', 'Require cycle', 'Warning, duplicate ID'])

export default function App() {
  const isLoadingComplete = useCachedResources()
  useExpoUpdates(3)

  if (!isLoadingComplete) {
    return <View style={{ flex: 1, backgroundColor: 'orange' }} />
  }
  return (
    <Provider>
      <StatusBar style="light" />
      <NativeNavigation />
    </Provider>
  )
}
