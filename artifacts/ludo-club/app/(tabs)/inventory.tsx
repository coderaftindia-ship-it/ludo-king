import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

import { GameBackground } from "@/components/GameBackground";
import { TopBar } from "@/components/TopBar";
import { useGame } from "@/context/GameContext";

type Tab = "dice" | "avatar" | "emoji" | "board" | "pawns" | "rocket";

interface DiceItem {
  id: string;
  name: string;
  rarity: "Common" | "Rare" | "Epic";
  grad: [string, string];
  dotColor: string;
}

interface EmojiItem {
  id: string;
  icon: string;
  equipped?: boolean;
  isEmpty?: boolean;
}

interface ThemeItem {
  id: string;
  name: string;
  cost: string | null;
  grad: [string, string, string];
}

interface PawnItem {
  id: string;
  name: string;
  rarity: "Common" | "Rare" | "Epic";
  locked: boolean;
  equipped?: boolean;
  colors: string[];
}

const DICE_ITEMS: DiceItem[] = [
  { id: "d1", name: "Ocea", rarity: "Rare", grad: ["#1e90ff", "#006aba"], dotColor: "#fff" },
  { id: "d2", name: "Rollic", rarity: "Rare", grad: ["#b87333", "#7a4510"], dotColor: "#ffd700" },
  { id: "d3", name: "Abstracto", rarity: "Rare", grad: ["#607d8b", "#37474f"], dotColor: "#fff" },
  { id: "d4", name: "Olivara", rarity: "Rare", grad: ["#ffa726", "#e65c00"], dotColor: "#fff" },
  { id: "d5", name: "Cosmico", rarity: "Rare", grad: ["#ab47bc", "#6a1b9a"], dotColor: "#fff" },
  { id: "d6", name: "Voltix", rarity: "Rare", grad: ["#66bb6a", "#2e7d32"], dotColor: "#fff" },
  { id: "d7", name: "Chargrin", rarity: "Rare", grad: ["#ef5350", "#b71c1c"], dotColor: "#ffd700" },
  { id: "d8", name: "Tiara", rarity: "Rare", grad: ["#26c6da", "#00838f"], dotColor: "#fff" },
  { id: "d9", name: "Rippy", rarity: "Rare", grad: ["#ec407a", "#880e4f"], dotColor: "#fff" },
  { id: "d10", name: "Floro", rarity: "Rare", grad: ["#d4e157", "#827717"], dotColor: "#333" },
  { id: "d11", name: "Grapza", rarity: "Rare", grad: ["#ff7043", "#bf360c"], dotColor: "#fff" },
  { id: "d12", name: "Peblo", rarity: "Rare", grad: ["#5c6bc0", "#1a237e"], dotColor: "#fff" },
];

const EMOJI_ITEMS: EmojiItem[] = [
  { id: "e1", icon: "emoticon-excited-outline" },
  { id: "e2", icon: "hand-back-right" },
  { id: "e3", icon: "emoticon-sick-outline" },
  { id: "e4", icon: "emoticon-angry-outline" },
  { id: "e5", icon: "emoticon-cry-outline" },
  { id: "e6", icon: "emoticon-cool-outline" },
  { id: "e7", icon: "emoticon-lol-outline" },
  { id: "e8", icon: "emoticon-neutral-outline" },
  { id: "e9", icon: "emoticon-wink-outline" },
  { id: "e10", icon: "emoticon-kiss-outline" },
  { id: "e11", icon: "sunglasses" },
  { id: "e12", icon: "emoticon-sad-outline" },
  { id: "e13", icon: "heart-outline" },
  { id: "e14", isEmpty: true, icon: "" },
];

const THEME_ITEMS: ThemeItem[] = [
  { id: "t1", name: "Neon", cost: "1 K", grad: ["#1a1a2e", "#16213e", "#0f3460"] },
  { id: "t2", name: "Garden", cost: "3 K", grad: ["#2d6a4f", "#40916c", "#74c69d"] },
  { id: "t3", name: "Ocean", cost: "25 K", grad: ["#0077b6", "#00b4d8", "#90e0ef"] },
  { id: "t4", name: "Lagoon", cost: "25 K", grad: ["#2ec4b6", "#cbf3f0", "#ffbf69"] },
  { id: "t5", name: "Prideway", cost: null, grad: ["#ff595e", "#ffca3a", "#6a4c93"] },
  { id: "t6", name: "Krakon", cost: null, grad: ["#073b4c", "#118ab2", "#06d6a0"] },
];

const PAWN_ITEMS: PawnItem[] = [
  { id: "p1", name: "Default", rarity: "Common", locked: false, equipped: true, colors: ["#f44", "#3af", "#4d4", "#ff0"] },
  { id: "p2", name: "Skaldir", rarity: "Rare", locked: true, colors: ["#795548", "#9e9e9e"] },
  { id: "p3", name: "Empress", rarity: "Rare", locked: true, colors: ["#e91e63", "#9c27b0"] },
  { id: "p4", name: "Kaboom", rarity: "Rare", locked: true, colors: ["#ff9800", "#f44336"] },
  { id: "p5", name: "Boo", rarity: "Rare", locked: true, colors: ["#9c27b0", "#673ab7"] },
  { id: "p6", name: "Elixir", rarity: "Rare", locked: true, colors: ["#2196f3", "#00bcd4"] },
  { id: "p7", name: "Jolly", rarity: "Rare", locked: true, colors: ["#f44336", "#ff9800"] },
  { id: "p8", name: "Boss", rarity: "Rare", locked: true, colors: ["#4caf50", "#8bc34a"] },
  { id: "p9", name: "Hopstar", rarity: "Rare", locked: true, colors: ["#ff5722", "#ff9800"] },
];

const TABS: { id: Tab; icon: string; dot?: boolean }[] = [
  { id: "dice", icon: "dice-6", dot: true },
  { id: "avatar", icon: "account-circle-outline" },
  { id: "emoji", icon: "emoticon-outline" },
  { id: "board", icon: "view-grid" },
  { id: "pawns", icon: "chess-pawn" },
  { id: "rocket", icon: "rocket-outline" },
];

function Dot3D({ color }: { color: string }) {
  return <View style={[styles.dot3d, { backgroundColor: color }]} />;
}

function DiceFace({ grad, dotColor }: { grad: [string, string]; dotColor: string }) {
  const d = dotColor;
  return (
    <LinearGradient colors={grad} style={styles.diceFace}>
      {/* Top row */}
      <View style={styles.diceRow}>
        <Dot3D color={d} />
        <View style={styles.dotEmpty} />
        <Dot3D color={d} />
      </View>
      {/* Middle row */}
      <View style={styles.diceRow}>
        <View style={styles.dotEmpty} />
        <Dot3D color={d} />
        <View style={styles.dotEmpty} />
      </View>
      {/* Bottom row */}
      <View style={styles.diceRow}>
        <Dot3D color={d} />
        <View style={styles.dotEmpty} />
        <Dot3D color={d} />
      </View>
    </LinearGradient>
  );
}

function DiceCard({ item }: { item: DiceItem }) {
  const { inventory, addProgress } = useGame();
  const inv = inventory[item.id];
  const progress = inv?.progress ?? 0;

  return (
    <View style={styles.diceCard}>
      <Text style={styles.diceName}>{item.name}</Text>
      <Text style={styles.diceRarity}>{item.rarity}</Text>
      <DiceFace grad={item.grad} dotColor={item.dotColor} />
      <View style={styles.progressSection}>
        <MaterialCommunityIcons name="play-circle-outline" size={12} color="#bbb" />
        <View style={styles.progBarBg}>
          <LinearGradient
            colors={["#ffd700", "#ff9500"]}
            style={[styles.progBarFill, { width: `${(progress / 50) * 100}%` as any }]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          />
        </View>
        <Text style={styles.progText}>{progress} / 50</Text>
      </View>
      <TouchableOpacity
        style={styles.watchBtn}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          addProgress(item.id, 5);
        }}
        activeOpacity={0.8}
      >
        <LinearGradient colors={["#4aa3ff", "#2070dd"]} style={styles.watchBtnGrad}>
          <Text style={styles.watchBtnText}>Watch Ad</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

function EmojiCard({ item, equipped, onEquip }: { item: EmojiItem; equipped: boolean; onEquip: () => void }) {
  if (item.isEmpty) {
    return <View style={[styles.emojiCard, styles.emptyCard]}><Text style={styles.emptyText}>Empty</Text></View>;
  }
  return (
    <TouchableOpacity
      style={[styles.emojiCard, equipped && styles.emojiEquipped]}
      onPress={onEquip}
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons
        name={item.icon as any}
        size={38}
        color={equipped ? "#ffc107" : "#fff8e0"}
      />
    </TouchableOpacity>
  );
}

function ThemeCard({ item }: { item: ThemeItem }) {
  return (
    <TouchableOpacity style={styles.themeCardWrap} activeOpacity={0.85}>
      <View style={styles.themeCard}>
        <View style={styles.themePreviewRow}>
          {item.grad.map((c, i) => (
            <View key={i} style={[styles.themeStrip, { backgroundColor: c }]} />
          ))}
          <View style={[styles.ludoBoardOverlay]}>
            <MaterialCommunityIcons name="grid" size={30} color="rgba(255,255,255,0.4)" />
          </View>
        </View>
        <Text style={styles.themeName}>{item.name}</Text>
        {item.cost ? (
          <View style={styles.costRow}>
            <MaterialCommunityIcons name="cash" size={14} color="#4dd45a" />
            <Text style={styles.costText}>{item.cost}</Text>
          </View>
        ) : (
          <Text style={styles.lockedCost}>Locked</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

function PawnCard({ item }: { item: PawnItem }) {
  return (
    <View style={[styles.pawnCard, item.equipped && styles.pawnEquipped]}>
      <Text style={styles.diceName}>{item.name}</Text>
      <Text style={[styles.diceRarity, item.rarity === "Common" && { color: "#a0ffb0" }]}>
        {item.rarity}
      </Text>
      <View style={styles.pawnsGrid}>
        {item.colors.map((c, i) => (
          <View key={i} style={[styles.pawnPiece, { backgroundColor: c }]}>
            <Ionicons name="person" size={10} color="#fff" />
          </View>
        ))}
      </View>
      {item.equipped ? (
        <LinearGradient colors={["#4dd45a", "#27ae60"]} style={styles.equippedBadge}>
          <Text style={styles.equippedText}>Equipped</Text>
        </LinearGradient>
      ) : (
        <View style={styles.lockedBadge}>
          <Ionicons name="lock-closed" size={10} color="#999" />
          <Text style={styles.lockedBadgeText}>Locked</Text>
        </View>
      )}
    </View>
  );
}

export default function InventoryScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("dice");
  const [equippedEmoji, setEquippedEmoji] = useState("e1");
  const BOTTOM_PAD = Platform.OS === "web" ? 84 + 34 : 84;

  function renderGrid() {
    if (activeTab === "dice") {
      return (
        <FlatList
          data={DICE_ITEMS}
          numColumns={3}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <DiceCard item={item} />}
          columnWrapperStyle={styles.row3}
          contentContainerStyle={[styles.grid, { paddingBottom: BOTTOM_PAD }]}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!!DICE_ITEMS.length}
          ListHeaderComponent={
            <View style={styles.diceHeader}>
              <Text style={styles.diceHeaderText}>Dice Collection: 14 / 578</Text>
              <TouchableOpacity style={styles.sortBtn}>
                <Text style={styles.sortBtnTxt}>Sort By</Text>
                <Ionicons name="chevron-down" size={12} color="#fff" />
              </TouchableOpacity>
            </View>
          }
        />
      );
    }
    if (activeTab === "emoji") {
      return (
        <FlatList
          data={EMOJI_ITEMS}
          numColumns={4}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <EmojiCard
              item={item}
              equipped={equippedEmoji === item.id}
              onEquip={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setEquippedEmoji(item.id);
              }}
            />
          )}
          columnWrapperStyle={styles.row4}
          contentContainerStyle={[styles.grid, { paddingBottom: BOTTOM_PAD }]}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          ListHeaderComponent={
            <View>
              <Text style={styles.deckTitle}>Emoji deck</Text>
              <LinearGradient colors={["#c43010", "#e65020"]} style={styles.inventoryBanner}>
                <Text style={styles.inventoryBannerText}>Inventory (0/144)</Text>
              </LinearGradient>
            </View>
          }
        />
      );
    }
    if (activeTab === "board") {
      return (
        <FlatList
          data={THEME_ITEMS}
          numColumns={2}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <ThemeCard item={item} />}
          columnWrapperStyle={styles.row2}
          contentContainerStyle={[styles.grid, { paddingBottom: BOTTOM_PAD }]}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!!THEME_ITEMS.length}
        />
      );
    }
    if (activeTab === "pawns") {
      return (
        <FlatList
          data={PAWN_ITEMS}
          numColumns={3}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <PawnCard item={item} />}
          columnWrapperStyle={styles.row3}
          contentContainerStyle={[styles.grid, { paddingBottom: BOTTOM_PAD }]}
          showsVerticalScrollIndicator={false}
          scrollEnabled={!!PAWN_ITEMS.length}
          ListHeaderComponent={
            <View style={styles.trailBanner}>
              <Ionicons name="information-circle-outline" size={15} color="#aad4ff" />
              <Text style={styles.trailLabel}>Trail</Text>
              <Text style={styles.trailDesc}>Stylize pawn movement With TRAIL!</Text>
              <View style={styles.trailSwitch}><Text style={styles.trailSwitchText}>OFF</Text></View>
            </View>
          }
        />
      );
    }
    return (
      <View style={styles.emptyScreen}>
        <MaterialCommunityIcons name="lock-outline" size={56} color="rgba(255,255,255,0.2)" />
        <Text style={styles.emptyScreenText}>Coming Soon</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: "#1565c0" }]}>
      <GameBackground />
      <TopBar />

      {/* Tab icons row */}
      <View style={styles.tabRow}>
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabBtn, active && styles.tabBtnActive]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setActiveTab(tab.id);
              }}
            >
              {active ? (
                <LinearGradient colors={["#ffffff22", "#ffffff11"]} style={styles.tabBtnGrad}>
                  <MaterialCommunityIcons name={tab.icon as any} size={26} color="#fff" />
                  {tab.dot && <View style={styles.tabDot} />}
                </LinearGradient>
              ) : (
                <View style={styles.tabBtnGrad}>
                  <MaterialCommunityIcons name={tab.icon as any} size={24} color="rgba(255,255,255,0.5)" />
                  {tab.dot && <View style={styles.tabDot} />}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ flex: 1 }}>{renderGrid()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 6,
    paddingVertical: 6,
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  tabBtn: {
    flex: 1,
    alignItems: "center",
  },
  tabBtnActive: {},
  tabBtnGrad: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  tabDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff3d3d",
    borderWidth: 1.5,
    borderColor: "#1565c0",
  },

  grid: { paddingHorizontal: 8, paddingTop: 10, gap: 8 },
  row3: { gap: 8, marginBottom: 0 },
  row4: { gap: 6, marginBottom: 0 },
  row2: { gap: 10, marginBottom: 0 },

  diceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  diceHeaderText: {
    color: "#fff",
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    fontSize: 13,
  },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  sortBtnTxt: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },

  diceCard: {
    flex: 1,
    borderRadius: 14,
    padding: 8,
    alignItems: "center",
    gap: 5,
    backgroundColor: "#8a44c0",
    borderWidth: 1.5,
    borderColor: "#6a28a0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  diceName: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  diceRarity: {
    color: "#d4a0ff",
    fontSize: 10,
    fontFamily: "Inter_500Medium",
  },

  diceFace: {
    width: 58,
    height: 58,
    borderRadius: 12,
    padding: 7,
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  diceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dot3d: {
    width: 9,
    height: 9,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  dotEmpty: { width: 9, height: 9 },

  progressSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    width: "100%",
  },
  progBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progBarFill: {
    height: "100%",
    borderRadius: 3,
    minWidth: 2,
  },
  progText: {
    color: "#ddd",
    fontSize: 8,
    fontFamily: "Inter_500Medium",
  },
  watchBtn: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  watchBtnGrad: {
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 20,
  },
  watchBtnText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },

  emojiCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c8a870",
    borderWidth: 2.5,
    borderColor: "#a07840",
    margin: 3,
  },
  emojiEquipped: {
    borderColor: "#ffd700",
    backgroundColor: "#d4b880",
  },
  emptyCard: {
    backgroundColor: "rgba(0,0,0,0.15)",
    borderColor: "rgba(255,255,255,0.1)",
  },
  emptyText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },

  deckTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  inventoryBanner: {
    borderRadius: 24,
    paddingVertical: 9,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2.5,
    borderColor: "#8a2000",
  },
  inventoryBannerText: {
    color: "#fff",
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    fontSize: 14,
  },

  themeCardWrap: { flex: 1 },
  themeCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.15)",
  },
  themePreviewRow: {
    flexDirection: "row",
    height: 90,
    position: "relative",
  },
  themeStrip: { flex: 1 },
  ludoBoardOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  themeName: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    paddingTop: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  costRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    gap: 3,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  costText: {
    color: "#4dd45a",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  lockedCost: {
    color: "#888",
    textAlign: "center",
    fontSize: 11,
    paddingBottom: 8,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  pawnCard: {
    flex: 1,
    borderRadius: 14,
    padding: 8,
    alignItems: "center",
    gap: 4,
    backgroundColor: "#8a44c0",
    borderWidth: 1.5,
    borderColor: "#6a28a0",
  },
  pawnEquipped: {
    borderColor: "#4dd45a",
    backgroundColor: "#1a5a28",
  },
  pawnsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    justifyContent: "center",
    marginVertical: 4,
  },
  pawnPiece: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
  },
  equippedBadge: {
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 6,
    width: "100%",
    alignItems: "center",
  },
  equippedText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  lockedBadge: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: "center",
    gap: 4,
    width: "100%",
    justifyContent: "center",
  },
  lockedBadgeText: {
    color: "#888",
    fontSize: 10,
    fontFamily: "Inter_500Medium",
  },

  trailBanner: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    gap: 5,
  },
  trailLabel: { color: "#fff", fontWeight: "700", fontFamily: "Inter_700Bold", fontSize: 12 },
  trailDesc: { flex: 1, color: "#aad4ff", fontSize: 10, fontFamily: "Inter_400Regular" },
  trailSwitch: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#555",
  },
  trailSwitchText: { color: "#aaa", fontSize: 11, fontFamily: "Inter_700Bold" },

  emptyScreen: {
    flex: 1, alignItems: "center", justifyContent: "center", gap: 12, paddingTop: 80,
  },
  emptyScreenText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
});
