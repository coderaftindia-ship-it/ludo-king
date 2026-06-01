import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { TopBar } from "@/components/TopBar";
import { useGame } from "@/context/GameContext";
import { useColors } from "@/hooks/useColors";

type StoreTab = "coins" | "gems" | "specials";

interface StoreItem {
  id: string;
  title: string;
  description: string;
  price: string;
  priceType: "gem" | "coin" | "usd";
  tag?: "BEST VALUE" | "POPULAR" | "LIMITED";
  color: string;
  amount: number;
  icon: string;
}

const COIN_PACKS: StoreItem[] = [
  { id: "c1", title: "Coin Starter", description: "10,000 Coins", price: "50", priceType: "gem", color: "#ff9500", amount: 10000, icon: "gold", tag: "POPULAR" },
  { id: "c2", title: "Coin Bundle", description: "50,000 Coins", price: "200", priceType: "gem", color: "#ff7700", amount: 50000, icon: "gold" },
  { id: "c3", title: "Coin Stack", description: "150,000 Coins", price: "500", priceType: "gem", color: "#e65c00", amount: 150000, icon: "gold", tag: "BEST VALUE" },
  { id: "c4", title: "Coin Vault", description: "500,000 Coins", price: "1500", priceType: "gem", color: "#cc4400", amount: 500000, icon: "bank" },
];

const GEM_PACKS: StoreItem[] = [
  { id: "g1", title: "Gem Pouch", description: "100 Gems", price: "$0.99", priceType: "usd", color: "#00bcd4", amount: 100, icon: "diamond-stone" },
  { id: "g2", title: "Gem Pack", description: "500 Gems", price: "$3.99", priceType: "usd", color: "#0097a7", amount: 500, icon: "diamond-stone", tag: "POPULAR" },
  { id: "g3", title: "Gem Chest", description: "1200 Gems", price: "$7.99", priceType: "usd", color: "#00838f", amount: 1200, icon: "treasure-chest", tag: "BEST VALUE" },
  { id: "g4", title: "Gem Vault", description: "5000 Gems", price: "$24.99", priceType: "usd", color: "#006064", amount: 5000, icon: "bank" },
];

const SPECIAL_PACKS: StoreItem[] = [
  { id: "s1", title: "Season Pass", description: "7 days of premium rewards", price: "500", priceType: "gem", color: "#9c27b0", amount: 0, icon: "star-circle", tag: "LIMITED" },
  { id: "s2", title: "Power Bundle", description: "5 Extra Powerups", price: "200", priceType: "gem", color: "#e91e63", amount: 5, icon: "lightning-bolt" },
  { id: "s3", title: "Lucky Chest", description: "Random rare dice/pawn", price: "1000", priceType: "coin", color: "#ff5722", amount: 0, icon: "treasure-chest" },
];

const STORE_TABS: { id: StoreTab; label: string; icon: string }[] = [
  { id: "coins", label: "Coins", icon: "gold" },
  { id: "gems", label: "Gems", icon: "diamond-stone" },
  { id: "specials", label: "Specials", icon: "star-circle" },
];

function StoreCard({ item, onBuy }: { item: StoreItem; onBuy: () => void }) {
  return (
    <TouchableOpacity
      style={[styles.storeCard, { backgroundColor: item.color }]}
      onPress={onBuy}
      activeOpacity={0.85}
    >
      {item.tag && (
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      )}
      <MaterialCommunityIcons name={item.icon as any} size={44} color="rgba(255,255,255,0.9)" />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDesc}>{item.description}</Text>
      <View style={styles.priceBtn}>
        {item.priceType === "gem" && (
          <MaterialCommunityIcons name="diamond-stone" size={14} color="#fff" />
        )}
        {item.priceType === "coin" && (
          <MaterialCommunityIcons name="gold" size={14} color="#fff" />
        )}
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function StoreScreen() {
  const colors = useColors();
  const [activeTab, setActiveTab] = useState<StoreTab>("coins");
  const { addCoins, addGems } = useGame();

  const data = activeTab === "coins" ? COIN_PACKS : activeTab === "gems" ? GEM_PACKS : SPECIAL_PACKS;
  const bottomPad = Platform.OS === "web" ? 84 + 34 : 84;

  function handleBuy(item: StoreItem) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (item.priceType === "coin" || (activeTab === "coins" && item.amount > 0)) {
      addCoins(item.amount);
    } else if (activeTab === "gems" && item.amount > 0) {
      addGems(item.amount);
    }
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <TopBar />

      <View style={styles.banner}>
        <MaterialCommunityIcons name="sale" size={20} color="#ff3030" />
        <Text style={styles.bannerText}>Limited Time Offers!</Text>
        <Text style={styles.bannerTimer}>2h 45m</Text>
      </View>

      <View style={styles.tabRow}>
        {STORE_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabBtn,
              activeTab === tab.id && styles.tabBtnActive,
            ]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setActiveTab(tab.id);
            }}
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={16}
              color={activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.6)"}
            />
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        numColumns={2}
        renderItem={({ item }) => <StoreCard item={item} onBuy={() => handleBuy(item)} />}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!data.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,48,48,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,48,48,0.3)",
  },
  bannerText: {
    flex: 1,
    color: "#ff8080",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  bannerTimer: {
    color: "#ff3030",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  tabRow: {
    flexDirection: "row",
    margin: 12,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 14,
    padding: 4,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 10,
    gap: 4,
  },
  tabBtnActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  tabLabel: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  tabLabelActive: {
    color: "#fff",
    fontFamily: "Inter_700Bold",
  },
  content: {
    paddingHorizontal: 12,
    gap: 12,
  },
  gridRow: {
    gap: 12,
    marginBottom: 4,
  },
  storeCard: {
    flex: 1,
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    gap: 6,
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tagBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#ff3030",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  cardDesc: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
  priceBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
    marginTop: 4,
  },
  priceText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
});
