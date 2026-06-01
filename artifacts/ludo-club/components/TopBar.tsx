import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGame } from "@/context/GameContext";

function formatNum(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + " M";
  if (n >= 1_000) return Math.floor(n / 1_000) + "K";
  return String(n);
}

interface TopBarProps {
  onBackPress?: () => void;
}

export function TopBar({ onBackPress }: TopBarProps) {
  const insets = useSafeAreaInsets();
  const { coins, gems, level } = useGame();
  const topPad = insets.top + (Platform.OS === "web" ? 44 : 0);

  return (
    <LinearGradient
      colors={["#0d4a87", "#0e5ca0"]}
      style={[styles.container, { paddingTop: topPad + 8 }]}
    >
      <View style={styles.inner}>
        {/* Avatar / Back */}
        {onBackPress ? (
          <TouchableOpacity style={styles.backBtn} onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onBackPress();
          }}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.avatarGroup}>
            <View style={styles.avatarRing}>
              <View style={styles.avatarInner}>
                <Ionicons name="person" size={22} color="#fff" />
              </View>
              <View style={styles.lvlBadge}>
                <Text style={styles.lvlText}>{level}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Currency pills */}
        <View style={styles.pills}>
          {/* Coins pill */}
          <TouchableOpacity
            style={styles.pill}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            activeOpacity={0.8}
          >
            <View style={styles.coinCircle}>
              <MaterialCommunityIcons name="gold" size={15} color="#fff" />
            </View>
            <Text style={styles.pillText}>{formatNum(coins)}</Text>
            <View style={styles.addBtn}>
              <Ionicons name="add" size={13} color="#fff" />
            </View>
          </TouchableOpacity>

          {/* Gems pill + SALE */}
          <View style={styles.gemGroup}>
            <TouchableOpacity
              style={[styles.pill, styles.gemPill]}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              activeOpacity={0.8}
            >
              <View style={styles.gemCircle}>
                <MaterialCommunityIcons name="cash" size={15} color="#fff" />
              </View>
              <Text style={styles.pillText}>{gems}</Text>
              <View style={styles.addBtn}>
                <Ionicons name="add" size={13} color="#fff" />
              </View>
            </TouchableOpacity>
            <View style={styles.saleBanner}>
              <Text style={styles.saleText}>SALE</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <TouchableOpacity style={styles.gearBtn}>
          <Ionicons name="settings-outline" size={22} color="rgba(255,255,255,0.85)" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarGroup: {
    width: 48,
  },
  avatarRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2.5,
    borderColor: "#ffd700",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarInner: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#c0392b",
    alignItems: "center",
    justifyContent: "center",
  },
  lvlBadge: {
    position: "absolute",
    bottom: -5,
    left: -3,
    backgroundColor: "#ff7a00",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 1.5,
    borderColor: "#fff",
    minWidth: 22,
    alignItems: "center",
  },
  lvlText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "800",
    fontFamily: "Inter_700Bold",
  },
  pills: {
    flex: 1,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    borderRadius: 18,
    paddingLeft: 3,
    paddingRight: 3,
    paddingVertical: 4,
    gap: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  gemPill: {
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  gemGroup: {
    alignItems: "center",
    position: "relative",
    paddingBottom: 10,
  },
  coinCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ff9500",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#ffd700",
  },
  gemCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#27ae60",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#2ecc71",
  },
  pillText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    minWidth: 36,
    textAlign: "center",
  },
  addBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  saleBanner: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#e53935",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  saleText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "800",
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.8,
  },
  gearBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e68900",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffaa00",
  },
});
