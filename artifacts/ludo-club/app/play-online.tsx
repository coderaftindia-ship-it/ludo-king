import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";

import { GameBackground } from "@/components/GameBackground";

// Mode types
type Mode = "classic" | "rush" | "bolt";
type TokenColor = "blue" | "red" | "green" | "yellow";
type Tab = "friends" | "online";

export default function PlayOnlineScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("online");
  const [selectedMode, setSelectedMode] = useState<Mode>("classic");
  const [selectedToken, setSelectedToken] = useState<TokenColor>("blue");
  const [entryFee, setEntryFee] = useState<number>(1.00); // In Millions

  const handleTabChange = (tab: Tab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveTab(tab);
  };

  const handleModeChange = (mode: Mode) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedMode(mode);
  };

  const handleTokenChange = (color: TokenColor) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedToken(color);
  };

  const adjustEntryFee = (increment: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setEntryFee((prev) => {
      const next = increment ? prev + 0.5 : prev - 0.5;
      return next < 0.5 ? 0.5 : next;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameBackground />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
          style={styles.backButton}
        >
          <LinearGradient
            colors={["#fcd667", "#f3a123"]}
            style={styles.backGradient}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{activeTab === "online" ? "2 vs 2" : "Play Friends"}</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Segmented Controller (Friends / Online) */}
        <View style={styles.tabContainer}>
          <View style={styles.tabTrack}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleTabChange("friends")}
              style={[
                styles.tabButton,
                activeTab === "friends" && styles.tabButtonActive,
              ]}
            >
              {activeTab === "friends" ? (
                <LinearGradient
                  colors={["#ffe875", "#fca311"]}
                  style={styles.activeTabGradient}
                >
                  <Text style={styles.tabTextActive}>Friends</Text>
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={10} color="#3de84a" />
                  </View>
                </LinearGradient>
              ) : (
                <Text style={styles.tabTextInactive}>Friends</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleTabChange("online")}
              style={[
                styles.tabButton,
                activeTab === "online" && styles.tabButtonActive,
              ]}
            >
              {activeTab === "online" ? (
                <LinearGradient
                  colors={["#ffe875", "#fca311"]}
                  style={styles.activeTabGradient}
                >
                  <Text style={styles.tabTextActive}>Online</Text>
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={10} color="#3de84a" />
                  </View>
                </LinearGradient>
              ) : (
                <Text style={styles.tabTextInactive}>Online</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Modes Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderBadge}>
            <Text style={styles.sectionHeaderText}>MODES</Text>
            <TouchableOpacity style={styles.infoButton}>
              <Ionicons name="information-circle" size={16} color="#2196f3" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.modesContainer}>
          {/* Classic Mode */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleModeChange("classic")}
            style={styles.modeItem}
          >
            {selectedMode === "classic" ? (
              <LinearGradient
                colors={["#29b6f6", "#0288d1"]}
                style={[styles.modeCircle, styles.modeCircleSelected]}
              >
                <Text style={styles.classicLetter}>C</Text>
              </LinearGradient>
            ) : (
              <LinearGradient
                colors={["#e5cbb5", "#cba382"]}
                style={styles.modeCircle}
              >
                <Text style={[styles.classicLetter, styles.classicLetterInactive]}>C</Text>
              </LinearGradient>
            )}
            <Text style={[styles.modeText, selectedMode === "classic" && styles.modeTextSelected]}>Classic</Text>
          </TouchableOpacity>

          {/* Rush Mode */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleModeChange("rush")}
            style={styles.modeItem}
          >
            <LinearGradient
              colors={
                selectedMode === "rush"
                  ? ["#ff8a65", "#d84315"]
                  : ["#e5cbb5", "#cba382"]
              }
              style={[
                styles.modeCircle,
                selectedMode === "rush" && styles.modeCircleSelected,
              ]}
            >
              <MaterialCommunityIcons
                name="clock-fast"
                size={28}
                color={selectedMode === "rush" ? "#fff" : "#7d5d42"}
              />
            </LinearGradient>
            <Text style={[styles.modeText, selectedMode === "rush" && styles.modeTextSelected]}>Rush</Text>
          </TouchableOpacity>

          {/* Bolt Mode */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleModeChange("bolt")}
            style={styles.modeItem}
          >
            <LinearGradient
              colors={
                selectedMode === "bolt"
                  ? ["#ffd54f", "#ff8f00"]
                  : ["#e5cbb5", "#cba382"]
              }
              style={[
                styles.modeCircle,
                selectedMode === "bolt" && styles.modeCircleSelected,
              ]}
            >
              <Ionicons
                name="flash"
                size={28}
                color={selectedMode === "bolt" ? "#fff" : "#7d5d42"}
              />
            </LinearGradient>
            <Text style={[styles.modeText, selectedMode === "bolt" && styles.modeTextSelected]}>Bolt</Text>
          </TouchableOpacity>
        </View>

        {/* Tokens Selection */}
        <View style={styles.tokensContainer}>
          {/* Blue Token */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleTokenChange("blue")}
            style={styles.tokenWrapper}
          >
            {selectedToken === "blue" && <View style={styles.selectedRing} />}
            <View style={[styles.tokenShadow]} />
            <MaterialCommunityIcons
              name="chess-pawn"
              size={56}
              color="#0d47a1"
              style={styles.tokenIcon}
            />
          </TouchableOpacity>

          {/* Red Token */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleTokenChange("red")}
            style={styles.tokenWrapper}
          >
            {selectedToken === "red" && <View style={styles.selectedRing} />}
            <View style={[styles.tokenShadow]} />
            <MaterialCommunityIcons
              name="chess-pawn"
              size={56}
              color="#d50000"
              style={styles.tokenIcon}
            />
          </TouchableOpacity>

          {/* Green Token */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleTokenChange("green")}
            style={styles.tokenWrapper}
          >
            {selectedToken === "green" && <View style={styles.selectedRing} />}
            <View style={[styles.tokenShadow]} />
            <MaterialCommunityIcons
              name="chess-pawn"
              size={56}
              color="#1b5e20"
              style={styles.tokenIcon}
            />
          </TouchableOpacity>

          {/* Yellow Token */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleTokenChange("yellow")}
            style={styles.tokenWrapper}
          >
            {selectedToken === "yellow" && <View style={styles.selectedRing} />}
            <View style={[styles.tokenShadow]} />
            <MaterialCommunityIcons
              name="chess-pawn"
              size={56}
              color="#ffc107"
              style={styles.tokenIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Rewards Box */}
        <View style={styles.rewardsCard}>
          <LinearGradient
            colors={["#8e2de2", "#4a00e0"]}
            style={styles.rewardsHeader}
          >
            <Text style={styles.rewardsHeaderText}>Rewards</Text>
          </LinearGradient>
          <View style={styles.rewardsContent}>
            {/* Top rewards */}
            <View style={styles.mainRewardRow}>
              <View style={styles.mainRewardItem}>
                <LinearGradient
                  colors={["#ffdf00", "#d4af37"]}
                  style={styles.goldCupBadge}
                >
                  <Text style={styles.cupRank}>1st</Text>
                </LinearGradient>
              </View>
              <View style={styles.coinRewardContainer}>
                <FontAwesome5 name="coins" size={28} color="#ffb300" />
                <Text style={styles.rewardCoinsText}>{(entryFee * 2).toFixed(2)} M</Text>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Sub rewards */}
            <View style={styles.subRewardsRow}>
              <View style={styles.subRewardItem}>
                <FontAwesome5 name="star" size={20} color="#ffb300" />
                <Text style={styles.subRewardValue}>x3.9K</Text>
              </View>

              <View style={styles.subRewardItem}>
                <Ionicons name="flame" size={20} color="#ff3d00" />
                <Text style={styles.subRewardValue}>x1</Text>
              </View>

              <View style={styles.subRewardItem}>
                <MaterialCommunityIcons name="fish" size={20} color="#e91e63" />
                <Text style={styles.subRewardValue}>x6</Text>
              </View>

              <View style={styles.subRewardItem}>
                <FontAwesome5 name="hat-wizard" size={20} color="#4caf50" />
                <Text style={styles.subRewardValue}>x1</Text>
              </View>

              <View style={styles.subRewardItem}>
                <Ionicons name="ticket" size={20} color="#ff9800" />
                <Text style={styles.subRewardValue}>x1</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer controls (Entry and Start button) */}
        <View style={styles.actionContainer}>
          {/* Entry Fee Row */}
          <View style={styles.entryBadge}>
            <Text style={styles.entryLabel}>Entry:</Text>
            <FontAwesome5 name="coins" size={14} color="#ffd700" style={styles.miniCoin} />
            <Text style={styles.entryValue}>{entryFee.toFixed(2)} M</Text>
          </View>

          {/* Start Actions */}
          <View style={styles.startRow}>
            {/* Minus Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => adjustEntryFee(false)}
              style={styles.adjustButton}
            >
              <LinearGradient
                colors={["#00d2ff", "#0086ff"]}
                style={styles.adjustGradient}
              >
                <Ionicons name="remove" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Start Game Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                alert("Matchmaking started...");
              }}
              style={styles.startButton}
            >
              <LinearGradient
                colors={["#3ae24c", "#1cb72c"]}
                style={styles.startGradient}
              >
                <Text style={styles.startButtonText}>Start</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Plus Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => adjustEntryFee(true)}
              style={styles.adjustButton}
            >
              <LinearGradient
                colors={["#00d2ff", "#0086ff"]}
                style={styles.adjustGradient}
              >
                <Ionicons name="add" size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer bar */}
      <View style={styles.footerBar}>
        <Text style={styles.footerText}>HAVE A TABLE CODE?</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            alert("Enter Table Code Modal");
          }}
          style={styles.joinButton}
        >
          <LinearGradient
            colors={["#42a5f5", "#1976d2"]}
            style={styles.joinGradient}
          >
            <Text style={styles.joinText}>Join</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebd9c0",
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2c7bf6",
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderColor: "#1967d2",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 8,
    overflow: "hidden",
  },
  backGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "Inter_700Bold",
  },
  headerRightPlaceholder: {
    width: 38,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 16,
  },
  tabContainer: {
    width: "100%",
    alignItems: "center",
  },
  tabTrack: {
    flexDirection: "row",
    backgroundColor: "#6e4b2d",
    borderRadius: 24,
    padding: 3,
    borderWidth: 2,
    borderColor: "#4a311b",
    width: "90%",
  },
  tabButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    overflow: "hidden",
  },
  activeTabGradient: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  tabTextActive: {
    color: "#5c3300",
    fontWeight: "900",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  tabTextInactive: {
    color: "#d0a98c",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  checkCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#3de84a",
  },
  sectionHeader: {
    width: "100%",
    alignItems: "center",
    marginVertical: 4,
  },
  sectionHeaderBadge: {
    backgroundColor: "#f5edd8",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#d0c3a8",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionHeaderText: {
    color: "#8b5e3c",
    fontWeight: "900",
    fontSize: 13,
    fontFamily: "Inter_700Bold",
  },
  infoButton: {
    justifyContent: "center",
  },
  modesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 16,
  },
  modeItem: {
    alignItems: "center",
    gap: 6,
    width: 76,
  },
  modeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  modeCircleSelected: {
    borderWidth: 3,
    borderColor: "#ffe082",
  },
  classicLetter: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    fontFamily: "Inter_700Bold",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 2,
  },
  classicLetterInactive: {
    color: "#7d5d42",
  },
  modeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#8b5e3c",
    fontFamily: "Inter_700Bold",
  },
  modeTextSelected: {
    color: "#5d381c",
  },
  tokensContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 12,
    paddingVertical: 10,
  },
  tokenWrapper: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  selectedRing: {
    position: "absolute",
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 3,
    borderColor: "#d50000",
    borderStyle: "dashed",
  },
  tokenShadow: {
    position: "absolute",
    bottom: 8,
    width: 32,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  tokenIcon: {
    zIndex: 1,
    marginTop: -8,
  },
  rewardsCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#9c27b0",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  rewardsHeader: {
    paddingVertical: 8,
    alignItems: "center",
  },
  rewardsHeaderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "Inter_700Bold",
  },
  rewardsContent: {
    padding: 12,
    alignItems: "center",
    backgroundColor: "#fcf9f5",
  },
  mainRewardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  mainRewardItem: {
    alignItems: "center",
  },
  goldCupBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#ffb300",
  },
  cupRank: {
    color: "#5c3300",
    fontWeight: "900",
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
  coinRewardContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rewardCoinsText: {
    color: "#5c3300",
    fontSize: 22,
    fontWeight: "900",
    fontFamily: "Inter_700Bold",
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#e0d0b0",
    marginVertical: 10,
  },
  subRewardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  subRewardItem: {
    alignItems: "center",
    gap: 4,
  },
  subRewardValue: {
    color: "#5c3300",
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  actionContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
    marginTop: 6,
  },
  entryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8c562c",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#ffe082",
    gap: 6,
  },
  entryLabel: {
    color: "#ffecb3",
    fontSize: 15,
    fontWeight: "700",
    fontFamily: "Inter_700Bold",
  },
  miniCoin: {
    marginLeft: 2,
  },
  entryValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    fontFamily: "Inter_700Bold",
  },
  startRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    width: "100%",
  },
  adjustButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  adjustGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    width: "60%",
    height: 52,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#1b5e20",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  startGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  startButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  footerBar: {
    height: 52,
    backgroundColor: "#6e421c",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderTopWidth: 2,
    borderColor: "#ffb300",
  },
  footerText: {
    color: "#ffe082",
    fontSize: 13,
    fontWeight: "900",
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },
  joinButton: {
    width: 78,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  joinGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  joinText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
});
