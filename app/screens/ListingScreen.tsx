import React, { FC, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { Card, Header, Screen, Text, Button, RelayContext } from "app/components"
import { spacing, colors } from "app/theme"
import { useNavigation } from "@react-navigation/native"
import { SearchIcon, PlusCircleIcon, ChevronDownIcon } from "lucide-react-native"
import { FlashList } from "@shopify/flash-list"
import { useStores } from "app/models"
import { delay } from "app/utils/delay"
import { ArcadeListings } from "arclib"
import Nip28Channel from "arclib/src/channel"

interface ListingScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Listing">> {}

// #TODO: replace with real channel id
const groupId = "d4de13fde818830703539f80ae31ce3419f8f18d39c3043013bee224be341c3b"

export const ListingScreen: FC<ListingScreenProps> = observer(function ListingScreen() {
  const pool: any = useContext(RelayContext)
  const channel: any = useMemo(() => new Nip28Channel(pool), [pool])
  const listings = useMemo(() => new ArcadeListings(channel, groupId), [channel, groupId])

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Channel store
  const { channelStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          title="Listing"
          titleStyle={{ color: colors.palette.cyan400 }}
          leftIcon="back"
          leftIconColor={colors.palette.cyan400}
          onLeftPress={() => navigation.goBack()}
          RightActionComponent={
            <View style={$headerRightActions}>
              <SearchIcon size={20} color={colors.palette.cyan400} />
              <PlusCircleIcon size={20} color={colors.palette.cyan400} />
            </View>
          }
        />
      ),
    })
  }, [])

  async function manualRefresh() {
    setRefreshing(true)
    await Promise.all([channelStore.fetchListings(listings), delay(750)])
    setRefreshing(false)
  }

  useEffect(() => {
    // loading
    setLoading(true)
    // fetch messages
    channelStore.reset()
    channelStore.fetchListings(listings)
    // done
    setLoading(false)
  }, [listings, channelStore])

  return (
    <Screen style={$root} preset="scroll">
      <View style={[$root, $container]}>
        <View style={$filters}>
          <View style={$filter}>
            <Text text="New York, NY" preset="default" />
            <ChevronDownIcon style={{ color: colors.palette.cyan800 }} />
          </View>
          <View style={$filter}>
            <Text text="USD/BTC" preset="default" />
            <ChevronDownIcon style={{ color: colors.palette.cyan800 }} />
          </View>
        </View>
        <View style={$content}>
          <FlashList
            data={channelStore.listing}
            extraData={channelStore.listing}
            renderItem={({ item }) => {
              const a = item.tags.find((tag) => tag["0"] === "a")
              const offer = JSON.parse(a[1])
              const type = offer.from === "BTC" ? "Sell" : "Buy"

              return (
                <Card
                  preset="reversed"
                  RightComponent={<Button text={type} style={$itemButton} />}
                  heading={item.content}
                  ContentComponent={
                    <View>
                      <Text text={`Amount: ${offer.amount}`} />
                      <Text text={`Rate: ${offer.rate}`} />
                      <Text text={`Payment: ${offer.payment}`} />
                    </View>
                  }
                  onPress={() =>
                    navigation.navigate("ListingDetail", {
                      channelId: channel,
                      listingId: item.id,
                      listingDetail: item.tags,
                    })
                  }
                  style={$item}
                />
              )
            }}
            ListEmptyComponent={
              loading ? (
                <View style={$emptyState}>
                  <Text text="Loading..." />
                </View>
              ) : (
                <View style={$emptyState}>
                  <Text text="No listings..." />
                </View>
              )
            }
            estimatedItemSize={300}
            refreshing={refreshing}
            onRefresh={manualRefresh}
          />
        </View>
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $headerRightActions: ViewStyle = {
  flexDirection: "row",
  gap: spacing.medium,
  paddingRight: spacing.medium,
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  paddingHorizontal: spacing.medium,
}

const $filters: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  gap: spacing.small,
}

const $filter: ViewStyle = {
  paddingHorizontal: spacing.small,
  flex: 1,
  height: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  borderColor: colors.palette.cyan900,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
}

const $content: ViewStyle = {
  paddingTop: spacing.medium,
}

const $item: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.extraSmall,
  paddingHorizontal: spacing.small,
  marginBottom: spacing.small,
  borderWidth: 1,
  borderColor: colors.palette.cyan500,
  borderRadius: spacing.small / 2,
  backgroundColor: colors.palette.overlay20,
  shadowColor: "transparent",
}

const $itemButton: ViewStyle = {
  backgroundColor: "transparent",
  borderWidth: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
  height: 30,
  minHeight: 30,
}

const $emptyState: ViewStyle = {
  alignSelf: "center",
  paddingVertical: spacing.medium,
}
