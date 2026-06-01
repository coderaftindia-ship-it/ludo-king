import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useGame } from "@/context/GameContext";

interface DayData {
  day: number;
  icon: "coin" | "gem" | "chest" | "power";
  value: string;
}

const DAYS: DayData[] = [
  { day: 1, icon: "coin", value: "2000" },
  { day: 2, icon: "gem", value: "150" },
  { day: 3, icon: "coin", value: "4500" },
  { day: 4, icon: "gem", value: "10" },
  { day: 5, icon: "chest", value: "Silver Chest" },
  { day: 6, icon: "coin", value: "10000" },
  { day: 7, icon: "power", value: "Extra Powerup" },
];

function DayTile({ d, claimed, current }: { d: DayData; claimed: boolean; current: boolean }) {
  const bg: [string, string] = current
    ? ["#3de84a", "#1ab528"]
    : claimed
    ? ["#5a9a5a", "#4a824a"]
    : ["#3a80cc", "#2060aa"];

  return (
    <LinearGradient colors={bg} style={[styles.dayTile, current && styles.dayTileActive]}>
      <Text style={styles.dayLabel}>Day {d.day}</Text>
      {claimed ? (
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={26} color="#fff" />
        </View>
      ) : (
        <View style={styles.rewardIcon}>
          {d.icon === "coin" && <MaterialCommunityIcons name="gold" size={30} color="#ffd700" />}
          {d.icon === "gem" && <MaterialCommunityIcons name="cash" size={30} color="#4dd45a" />}
          {d.icon === "chest" && <MaterialCommunityIcons name="treasure-chest" size={30} color="#c87941" />}
          {d.icon === "power" && <MaterialCommunityIcons name="lightning-bolt" size={30} color="#ffd700" />}
        </View>
      )}
      <Text style={styles.dayValue} numberOfLines={1}>
        {d.icon === "coin" || d.icon === "gem" ? d.value : d.day === 5 ? "Silver\nChest" : "Extra\nPowerup"}
      </Text>
    </LinearGradient>
  );
}

export function DailyBonusModal() {
  const { showDailyBonus, lastDailyBonusDay, claimDailyBonus, dismissDailyBonus } = useGame();
  const nextDay = Math.min(lastDailyBonusDay + 1, 7);

  return (
    <Modal
      visible={showDailyBonus}
      transparent
      animationType="fade"
      onRequestClose={dismissDailyBonus}
    >
      <View style={styles.overlay}>
        <LinearGradient
          colors={["#1565c0", "#0d47a1", "#0a3d8f"]}
          style={styles.container}
        >
          {/* Decorative corners */}
          <View style={styles.cornerTL} />
          <View style={styles.cornerTR} />
          <View style={styles.cornerBL} />
          <View style={styles.cornerBR} />

          <TouchableOpacity style={styles.closeBtn} onPress={dismissDailyBonus}>
            <Ionicons name="close" size={18} color="#fff" />
          </TouchableOpacity>

          <View style={styles.questionBtn}>
            <Ionicons name="help" size={16} color="#fff" />
          </View>

          <Text style={styles.title}>Daily Bonus</Text>

          {/* 3-column grid for days 1-6 */}
          <View style={styles.daysGrid}>
            {DAYS.slice(0, 6).map((d) => (
              <DayTile
                key={d.day}
                d={d}
                claimed={d.day <= lastDailyBonusDay}
                current={d.day === nextDay}
              />
            ))}
          </View>

          {/* Day 7 full row */}
          <LinearGradient
            colors={["#3a80cc", "#2060aa"]}
            style={styles.day7Row}
          >
            <Text style={styles.day7Label}>Day 7</Text>
            <MaterialCommunityIcons name="lightning-bolt" size={34} color="#ffd700" />
            <Text style={styles.day7Value}>Extra Powerup</Text>
          </LinearGradient>

          {/* Claim row */}
          <View style={styles.claimRow}>
            <TouchableOpacity
              style={styles.claimBtnWrap}
              onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                claimDailyBonus();
              }}
              activeOpacity={0.85}
            >
              <LinearGradient colors={["#4de058", "#27ae60"]} style={styles.claimBtnGrad}>
                <Text style={styles.claimBtnText}>Claim now</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.watchAlt}>
              <MaterialCommunityIcons name="play-circle" size={18} color="rgba(255,255,255,0.7)" />
              <MaterialCommunityIcons name="gold" size={16} color="#ffd700" />
              <Text style={styles.watchAltText}>9000</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  container: {
    borderRadius: 20,
    padding: 18,
    width: "100%",
    maxWidth: 370,
    borderWidth: 3,
    borderColor: "#ffd700",
    position: "relative",
    overflow: "hidden",
  },
  cornerTL: {
    position: "absolute", top: 6, left: 6,
    width: 14, height: 14,
    borderTopWidth: 3, borderLeftWidth: 3,
    borderColor: "rgba(255,215,0,0.5)",
  },
  cornerTR: {
    position: "absolute", top: 6, right: 6,
    width: 14, height: 14,
    borderTopWidth: 3, borderRightWidth: 3,
    borderColor: "rgba(255,215,0,0.5)",
  },
  cornerBL: {
    position: "absolute", bottom: 6, left: 6,
    width: 14, height: 14,
    borderBottomWidth: 3, borderLeftWidth: 3,
    borderColor: "rgba(255,215,0,0.5)",
  },
  cornerBR: {
    position: "absolute", bottom: 6, right: 6,
    width: 14, height: 14,
    borderBottomWidth: 3, borderRightWidth: 3,
    borderColor: "rgba(255,215,0,0.5)",
  },
  closeBtn: {
    position: "absolute", top: 12, right: 12, zIndex: 10,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center", justifyContent: "center",
  },
  questionBtn: {
    position: "absolute", top: 12, left: 12, zIndex: 10,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center", justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    marginBottom: 14,
    marginTop: 4,
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    justifyContent: "center",
  },
  dayTile: {
    width: "30%",
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
    gap: 4,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.2)",
  },
  dayTileActive: {
    borderColor: "#fff",
    shadowColor: "#4dd45a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
  },
  dayLabel: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    opacity: 0.9,
  },
  checkCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  rewardIcon: {
    height: 40, alignItems: "center", justifyContent: "center",
  },
  dayValue: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  day7Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 7,
    gap: 8,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.2)",
  },
  day7Label: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  day7Value: {
    color: "#ffd700",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  claimRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
    alignItems: "center",
  },
  claimBtnWrap: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
  },
  claimBtnGrad: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 24,
  },
  claimBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "Inter_700Bold",
  },
  watchAlt: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  watchAltText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
});
