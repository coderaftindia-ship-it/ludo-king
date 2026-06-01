import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
} from "react-native";

import { GameBackground } from "@/components/GameBackground";

type TokenColor = "blue" | "red" | "green" | "yellow";
type PlayersCount = 2 | 4;

export default function ComputerScreen() {
  const [players, setPlayers] = useState<PlayersCount>(2);
  const [selectedToken, setSelectedToken] = useState<TokenColor>("blue");

  const handlePlayersChange = (count: PlayersCount) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPlayers(count);
  };

  const handleTokenChange = (color: TokenColor) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedToken(color);
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
        <Text style={styles.headerTitle}>Computer</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Segmented Controller (2 Players / 4 Players) */}
        <View style={styles.tabContainer}>
          <View style={styles.tabTrack}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handlePlayersChange(2)}
              style={[
                styles.tabButton,
                players === 2 && styles.tabButtonActive,
              ]}
            >
              {players === 2 ? (
                <LinearGradient
                  colors={["#ffe875", "#fca311"]}
                  style={styles.activeTabGradient}
                >
                  <Text style={styles.tabTextActive}>2 Players</Text>
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={10} color="#3de84a" />
                  </View>
                </LinearGradient>
              ) : (
                <Text style={styles.tabTextInactive}>2 Players</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handlePlayersChange(4)}
              style={[
                styles.tabButton,
                players === 4 && styles.tabButtonActive,
              ]}
            >
              {players === 4 ? (
                <LinearGradient
                  colors={["#ffe875", "#fca311"]}
                  style={styles.activeTabGradient}
                >
                  <Text style={styles.tabTextActive}>4 Players</Text>
                  <View style={styles.checkCircle}>
                    <Ionicons name="checkmark" size={10} color="#3de84a" />
                  </View>
                </LinearGradient>
              ) : (
                <Text style={styles.tabTextInactive}>4 Players</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Mode info badge */}
        <View style={styles.modeBadgeContainer}>
          <Text style={styles.modeLabel}>Classic</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle" size={18} color="#2196f3" />
          </TouchableOpacity>
        </View>

        {/* Token Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            {/* Blue Token */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleTokenChange("blue")}
              style={styles.tokenWrapper}
            >
              {selectedToken === "blue" && <View style={styles.selectedRing} />}
              <View style={styles.tokenShadow} />
              <MaterialCommunityIcons
                name="chess-pawn"
                size={74}
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
              <View style={styles.tokenShadow} />
              <MaterialCommunityIcons
                name="chess-pawn"
                size={74}
                color="#d50000"
                style={styles.tokenIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.gridRow}>
            {/* Green Token */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleTokenChange("green")}
              style={styles.tokenWrapper}
            >
              {selectedToken === "green" && <View style={styles.selectedRing} />}
              <View style={styles.tokenShadow} />
              <MaterialCommunityIcons
                name="chess-pawn"
                size={74}
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
              <View style={styles.tokenShadow} />
              <MaterialCommunityIcons
                name="chess-pawn"
                size={74}
                color="#ffc107"
                style={styles.tokenIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Start Game Button (Floating/Centered at bottom of content) */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              alert("Starting offline match vs Computer...");
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
        </View>
      </ScrollView>
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
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    gap: 30,
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
  modeBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  modeLabel: {
    fontSize: 26,
    color: "#b07b53",
    fontWeight: "900",
    fontFamily: "Inter_700Bold",
  },
  infoButton: {
    justifyContent: "center",
  },
  gridContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
    paddingVertical: 10,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 36,
  },
  tokenWrapper: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  selectedRing: {
    position: "absolute",
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    borderColor: "#d50000",
    borderStyle: "dashed",
  },
  tokenShadow: {
    position: "absolute",
    bottom: 10,
    width: 44,
    height: 14,
    borderRadius: 7,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  tokenIcon: {
    zIndex: 1,
    marginTop: -10,
  },
  actionContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  startButton: {
    width: "70%",
    height: 54,
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
});
