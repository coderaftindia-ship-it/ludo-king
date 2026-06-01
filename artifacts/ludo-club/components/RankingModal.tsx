import { Ionicons } from "@expo/vector-icons";
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

export function RankingModal() {
  const { showRankingResult, ranking, dismissRankingResult } = useGame();

  return (
    <Modal
      visible={showRankingResult}
      transparent
      animationType="slide"
      onRequestClose={dismissRankingResult}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.titleBar}>
            <Text style={styles.titleText}>Ranking - Result</Text>
          </View>

          <Text style={styles.congrats}>Congratulations!</Text>

          <View style={styles.badgeContainer}>
            <View style={styles.medalOuter}>
              <View style={styles.medalInner}>
                <Ionicons name="star" size={48} color="#c0c0c0" />
              </View>
              <View style={styles.promotedBanner}>
                <Text style={styles.promotedText}>You're Promoted!</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLine}>
              New Badge: <Text style={styles.infoValue}>{ranking.badge}</Text>
            </Text>
            <Text style={styles.infoLine}>
              Previous Standing: <Text style={styles.infoValue}>{ranking.previous}</Text>
            </Text>
            <Text style={styles.encourageText}>
              Great job! Keep playing to climb even higher!
            </Text>

            <View style={styles.rewardsBox}>
              <Text style={styles.rewardsLabel}>Rewards</Text>
              <View style={styles.rewardItem}>
                <Ionicons name="cash-outline" size={32} color="#4dd45a" />
                <Text style={styles.rewardAmount}>{ranking.reward}</Text>
              </View>
            </View>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity
              style={styles.shareBtn}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                dismissRankingResult();
              }}
            >
              <Text style={styles.shareBtnText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.collectBtn}
              onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                dismissRankingResult();
              }}
            >
              <Text style={styles.collectBtnText}>Collect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "#f5e6c8",
    borderRadius: 20,
    overflow: "hidden",
    width: "100%",
    maxWidth: 340,
    borderWidth: 3,
    borderColor: "#ffd700",
  },
  titleBar: {
    backgroundColor: "#ff5a5a",
    paddingVertical: 10,
    alignItems: "center",
  },
  titleText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "Inter_700Bold",
  },
  congrats: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    color: "#333",
    textAlign: "center",
    marginTop: 16,
  },
  badgeContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  medalOuter: {
    alignItems: "center",
  },
  medalInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0e0e0",
    borderWidth: 4,
    borderColor: "#c0c0c0",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  promotedBanner: {
    marginTop: -12,
    backgroundColor: "#3d9eff",
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 12,
  },
  promotedText: {
    color: "#fff",
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    fontSize: 12,
  },
  infoBox: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    alignItems: "center",
    gap: 4,
  },
  infoLine: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Inter_400Regular",
  },
  infoValue: {
    fontWeight: "700",
    color: "#222",
    fontFamily: "Inter_700Bold",
  },
  encourageText: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
    marginTop: 4,
    fontFamily: "Inter_500Medium",
  },
  rewardsBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "100%",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0d0b0",
  },
  rewardsLabel: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
    color: "#555",
  },
  rewardItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  rewardAmount: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
    color: "#333",
  },
  btnRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e0d0b0",
  },
  shareBtn: {
    flex: 1,
    backgroundColor: "#3d9eff",
    paddingVertical: 14,
    alignItems: "center",
  },
  shareBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  collectBtn: {
    flex: 1,
    backgroundColor: "#4dd45a",
    paddingVertical: 14,
    alignItems: "center",
  },
  collectBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
});
