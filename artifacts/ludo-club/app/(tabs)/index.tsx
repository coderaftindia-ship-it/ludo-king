import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { DailyBonusModal } from "@/components/DailyBonusModal";
import { GameBackground } from "@/components/GameBackground";
import { RankingModal } from "@/components/RankingModal";
import { TopBar } from "@/components/TopBar";
import { useColors } from "@/hooks/useColors";

const BOTTOM_PAD = Platform.OS === "web" ? 84 + 34 : 84;

function SmallBadge({ icon, label, color = "#1a5fa8" }: { icon: React.ReactNode; label: string; color?: string }) {
  return (
    <View style={[styles.smallBadge, { backgroundColor: color }]}>
      {icon}
      <Text style={styles.smallBadgeText}>{label}</Text>
    </View>
  );
}

function TimerCard({ icon, title, timer, color }: { icon: React.ReactNode; title: string; timer: string; color: string }) {
  return (
    <LinearGradient colors={[color, color + "cc"]} style={styles.timerCard}>
      <View style={styles.timerTop}>
        {icon}
        <Text style={styles.timerTitle}>{title}</Text>
      </View>
      <View style={styles.timerRow}>
        <Ionicons name="remove-circle" size={12} color="#aad4ff" />
        <Text style={styles.timerValue}>{timer}</Text>
      </View>
    </LinearGradient>
  );
}

function ChestSlot({ type, timer, locked }: { type: string; timer: string; locked: boolean }) {
  const chestColors: Record<string, [string, string]> = {
    wood: ["#6d3b1a", "#8B4513"],
    silver: ["#7a7a9a", "#9090b8"],
    gold: ["#a07010", "#c89020"],
    free: ["#2d7d2d", "#3a9a3a"],
    locked: ["#0d2540", "#0d3050"],
  };
  const [c1, c2] = chestColors[type] ?? chestColors.locked;

  return (
    <View style={styles.chestSlot}>
      {locked && (
        <View style={styles.tapUnlock}>
          <Text style={styles.tapUnlockText}>Tap to Unlock</Text>
        </View>
      )}
      <LinearGradient colors={[c1, c2]} style={styles.chestCard}>
        <MaterialCommunityIcons
          name="treasure-chest"
          size={34}
          color={type === "silver" ? "#d0d0e8" : type === "gold" ? "#ffd700" : "#c87941"}
        />
        <Text style={styles.chestTimer}>{timer}</Text>
      </LinearGradient>
    </View>
  );
}

function SeasonChestSlot() {
  return (
    <View style={styles.chestSlot}>
      <LinearGradient colors={["#091a2d", "#0d2540"]} style={[styles.chestCard, styles.seasonCard]}>
        <Ionicons name="lock-closed" size={18} color="#4a6a8a" />
        <Text style={styles.seasonLine}>Season Pass</Text>
        <Text style={styles.seasonLine}>Chest Slot</Text>
      </LinearGradient>
    </View>
  );
}

export default function HomeScreen() {
  const colors = useColors();

  return (
    <View style={[styles.screen, { backgroundColor: "#1565c0" }]}>
      <GameBackground />
      <TopBar />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, { paddingBottom: BOTTOM_PAD }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Activity row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgeScroll}>
          <SmallBadge
            icon={<MaterialCommunityIcons name="movie-play" size={14} color="#ffc107" />}
            label="21"
            color="#1a3d6e"
          />
          <SmallBadge
            icon={<MaterialCommunityIcons name="star-circle" size={14} color="#aaa" />}
            label="81"
            color="#2a2a3a"
          />
          <View style={[styles.freeBadge]}>
            <LinearGradient colors={["#1a5299", "#1d64c0"]} style={styles.freeBadgeInner}>
              <MaterialCommunityIcons name="cash-multiple" size={22} color="#4dd45a" />
            </LinearGradient>
            <View style={styles.freeLabel}>
              <Text style={styles.freeLabelText}>FREE</Text>
            </View>
          </View>
          <TimerCard
            icon={<MaterialCommunityIcons name="trophy" size={14} color="#c0c0c0" />}
            title="Ranking"
            timer="11h 25m"
            color="#1d4a7a"
          />
          <TimerCard
            icon={<MaterialCommunityIcons name="podium" size={14} color="#3d9eff" />}
            title="Leaderboard"
            timer="22h 57m"
            color="#1a3d6e"
          />
          <SmallBadge
            icon={<Ionicons name="key" size={14} color="#ffd700" />}
            label="6"
            color="#1a3d6e"
          />
        </ScrollView>

        {/* CLAIM button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
          style={styles.claimWrap}
        >
          <LinearGradient
            colors={["#f5c518", "#f0a800", "#e09000"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.claimBtn}
          >
            <View style={styles.claimCornerTL} />
            <View style={styles.claimCornerTR} />
            <View style={styles.claimCornerBL} />
            <View style={styles.claimCornerBR} />
            <Text style={styles.claimText}>CLAIM!</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Play modes row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.playRow}
        >
          {/* Play Online */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
          >
            <LinearGradient
              colors={["#3de84a", "#25c435", "#1aab28"]}
              style={styles.playCard}
            >
              <View style={styles.playIconBg}>
                <Ionicons name="people" size={44} color="#fff" />
              </View>
              <Text style={styles.playCardText}>Play Online</Text>
              <View style={styles.playCardGlow} />
            </LinearGradient>
          </TouchableOpacity>

          {/* 2 vs 2 */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
          >
            <LinearGradient
              colors={["#3da8f0", "#2890da", "#1a78c2"]}
              style={styles.playCard}
            >
              <View style={styles.playIconBg}>
                <MaterialCommunityIcons name="account-group" size={44} color="#fff" />
              </View>
              <Text style={styles.playCardText}>2 vs 2</Text>
              <View style={styles.playCardGlow} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Computer */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}
          >
            <LinearGradient
              colors={["#c060f0", "#a040d8", "#8030c0"]}
              style={styles.playCard}
            >
              <View style={styles.playIconBg}>
                <MaterialCommunityIcons name="robot" size={44} color="#fff" />
              </View>
              <Text style={styles.playCardText}>vs Computer</Text>
              <View style={styles.playCardGlow} />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>

        {/* Mini Event */}
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient
            colors={["#7a3500", "#b05000"]}
            style={styles.miniEvent}
          >
            <View style={styles.miniEventLeft}>
              <MaterialCommunityIcons name="party-popper" size={28} color="#ffd700" />
              <View>
                <Text style={styles.miniEventTitle}>MINI</Text>
                <Text style={styles.miniEventTitle}>EVENT</Text>
              </View>
            </View>
            <View style={styles.miniEventRight}>
              <Text style={styles.miniEventDesc}>Limited time rewards!</Text>
              <View style={styles.miniEventBtn}>
                <Text style={styles.miniEventBtnText}>Join Now</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Chests row */}
        <View style={styles.chestsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chestsRow}>
            <ChestSlot type="free" timer="Free" locked={false} />
            <ChestSlot type="gold" timer="8h 0m" locked={true} />
            <ChestSlot type="silver" timer="3h 0m" locked={true} />
            <ChestSlot type="silver" timer="3h 0m" locked={true} />
            <SeasonChestSlot />
          </ScrollView>
        </View>
      </ScrollView>

      <DailyBonusModal />
      <RankingModal />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 10, paddingTop: 8, gap: 10 },

  badgeScroll: { flexGrow: 0 },

  smallBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 6,
    gap: 5,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  smallBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  freeBadge: {
    marginRight: 6,
    alignItems: "center",
  },
  freeBadgeInner: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  freeLabel: {
    backgroundColor: "#4dd45a",
    borderRadius: 8,
    paddingHorizontal: 6,
    marginTop: 2,
  },
  freeLabelText: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "800",
    fontFamily: "Inter_700Bold",
  },
  timerCard: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    minWidth: 90,
  },
  timerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timerTitle: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  timerValue: {
    color: "#aad4ff",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },

  claimWrap: { alignItems: "center" },
  claimBtn: {
    width: "90%",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#ffd700",
    shadowColor: "#f5c518",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
    position: "relative",
    overflow: "hidden",
  },
  claimCornerTL: {
    position: "absolute", top: 4, left: 4,
    width: 10, height: 10, borderTopWidth: 3, borderLeftWidth: 3, borderColor: "rgba(255,255,255,0.6)",
  },
  claimCornerTR: {
    position: "absolute", top: 4, right: 4,
    width: 10, height: 10, borderTopWidth: 3, borderRightWidth: 3, borderColor: "rgba(255,255,255,0.6)",
  },
  claimCornerBL: {
    position: "absolute", bottom: 4, left: 4,
    width: 10, height: 10, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: "rgba(255,255,255,0.6)",
  },
  claimCornerBR: {
    position: "absolute", bottom: 4, right: 4,
    width: 10, height: 10, borderBottomWidth: 3, borderRightWidth: 3, borderColor: "rgba(255,255,255,0.6)",
  },
  claimText: {
    color: "#5c3300",
    fontSize: 26,
    fontWeight: "900",
    fontFamily: "Inter_700Bold",
    letterSpacing: 4,
    textShadowColor: "rgba(255,255,200,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  playRow: {
    gap: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  playCard: {
    width: 150,
    height: 160,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    overflow: "hidden",
    position: "relative",
  },
  playIconBg: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  playCardText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    fontFamily: "Inter_700Bold",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  playCardGlow: {
    position: "absolute",
    top: -30,
    left: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  miniEvent: {
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffa500",
    gap: 12,
  },
  miniEventLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  miniEventTitle: {
    color: "#ffd700",
    fontSize: 13,
    fontWeight: "900",
    fontFamily: "Inter_700Bold",
    letterSpacing: 1,
  },
  miniEventRight: {
    flex: 1,
    gap: 6,
  },
  miniEventDesc: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  miniEventBtn: {
    backgroundColor: "#ff7a00",
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },
  miniEventBtnText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },

  chestsContainer: {
    marginHorizontal: -10,
  },
  chestsRow: {
    paddingHorizontal: 10,
    gap: 6,
  },
  chestSlot: {
    width: 80,
    alignItems: "center",
    gap: 2,
  },
  tapUnlock: {
    backgroundColor: "#0d2540",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginBottom: 2,
  },
  tapUnlockText: {
    color: "#fff",
    fontSize: 7,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  chestCard: {
    width: 78,
    height: 86,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.12)",
  },
  chestTimer: {
    color: "#ccc",
    fontSize: 9,
    fontFamily: "Inter_500Medium",
  },
  seasonCard: {
    borderStyle: "dashed",
    borderColor: "#4a6a8a",
  },
  seasonLine: {
    color: "#4a6a8a",
    fontSize: 8,
    textAlign: "center",
    fontFamily: "Inter_500Medium",
  },
});
