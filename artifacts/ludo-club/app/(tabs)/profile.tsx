import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { GameBackground } from "@/components/GameBackground";
import { TopBar } from "@/components/TopBar";
import { useGame } from "@/context/GameContext";

const STATS = [
  { label: "Games",   value: "1,284", icon: "gamepad-variant",  color: "#4db6ff" },
  { label: "Wins",    value: "512",   icon: "trophy",            color: "#ffd200" },
  { label: "Win %",   value: "39.9%", icon: "trending-up",       color: "#4dd45a" },
  { label: "Streak",  value: "12",    icon: "fire",              color: "#ff7043" },
];

const BADGES = [
  { name: "Bronze",   earned: true,  color: ["#cd7f32","#7a4510"] as [string,string] },
  { name: "Silver",   earned: true,  color: ["#c0c0c0","#707070"] as [string,string] },
  { name: "Gold",     earned: false, color: ["#ffd200","#b38600"] as [string,string] },
  { name: "Platinum", earned: false, color: ["#e5e4e2","#a0a0a0"] as [string,string] },
];

const BOARD = [
  { rank: 1, name: "LudoKing99", score: 45200 },
  { rank: 2, name: "ProGamer77", score: 41800 },
  { rank: 3, name: "StarPlayer", score: 38500 },
  { rank: 4, name: "GameMaster", score: 35200 },
  { rank: 5, name: "TopLudo",    score: 31900 },
  { rank: 6, name: "Player",     score: 28400, isMe: true },
  { rank: 7, name: "FastRoller", score: 24100 },
  { rank: 8, name: "DiceWiz",    score: 20800 },
];

const RANK_COLORS: Record<number, [string,string]> = {
  1: ["#ffd200","#b38600"],
  2: ["#c0c0c0","#606060"],
  3: ["#cd7f32","#7a4510"],
};

export default function ProfileScreen() {
  const { username, level } = useGame();
  const bottomPad = Platform.OS === "web" ? 84 + 34 : 84;

  return (
    <View style={{ flex: 1, backgroundColor: "#1565c0" }}>
      <GameBackground />
      <TopBar />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: bottomPad }]} showsVerticalScrollIndicator={false}>

        {/* Profile card */}
        <LinearGradient colors={["#0e3d6e","#091d3a"]} style={styles.profileCard}>
          <LinearGradient colors={["#ffd200","#e68a00"]} style={styles.avatarRing}>
            <LinearGradient colors={["#1e5fa0","#0a2d60"]} style={styles.avatar}>
              <Ionicons name="person" size={38} color="#fff" />
            </LinearGradient>
          </LinearGradient>
          <Text style={styles.profileName}>{username}</Text>
          <LinearGradient colors={["#1e5fa0","#0a2d60"]} style={styles.levelPill}>
            <Text style={styles.levelTxt}>Level {level}</Text>
          </LinearGradient>
          <View style={styles.xpBarWrap}>
            <LinearGradient colors={["#4dd45a","#1b8a28"]} style={[styles.xpFill, { width: "65%" }]} />
          </View>
          <Text style={styles.xpTxt}>6,500 / 10,000 XP</Text>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {STATS.map((s) => (
            <LinearGradient key={s.label} colors={["#0e3d6e","#091d3a"]} style={styles.statBox}>
              <MaterialCommunityIcons name={s.icon as any} size={22} color={s.color} />
              <Text style={[styles.statVal, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLbl}>{s.label}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* Badges */}
        <Text style={styles.sectionTitle}>Badges</Text>
        <View style={styles.badgesRow}>
          {BADGES.map((b) => (
            <LinearGradient
              key={b.name}
              colors={b.earned ? b.color : ["#1a1a2e","#0d0d1a"]}
              style={[styles.badgeCard, !b.earned && styles.badgeLocked]}
            >
              <MaterialCommunityIcons name="shield-star" size={30} color={b.earned ? "#fff" : "#333"} />
              <Text style={[styles.badgeName, !b.earned && { color: "#444" }]}>{b.name}</Text>
              {b.earned && <Ionicons name="checkmark-circle" size={11} color="#4dd45a" />}
            </LinearGradient>
          ))}
        </View>

        {/* Leaderboard */}
        <Text style={styles.sectionTitle}>Leaderboard</Text>
        <View style={styles.leaderList}>
          {BOARD.map((e) => (
            <LinearGradient
              key={e.rank}
              colors={e.isMe ? ["#1b5e20","#0a3010"] : ["#0e3d6e","#091d3a"]}
              style={[styles.leaderRow, e.isMe && styles.leaderMeRow]}
            >
              {RANK_COLORS[e.rank] ? (
                <LinearGradient colors={RANK_COLORS[e.rank]} style={styles.rankBadge}>
                  <MaterialCommunityIcons name="crown" size={13} color={e.rank === 1 ? "#7a3e00" : "#fff"} />
                </LinearGradient>
              ) : (
                <View style={[styles.rankBadge, { backgroundColor: "rgba(255,255,255,0.1)" }]}>
                  <Text style={styles.rankNum}>{e.rank}</Text>
                </View>
              )}
              <LinearGradient colors={["#2979ff","#1a237e"]} style={styles.leaderAva}>
                <Ionicons name="person" size={14} color="#fff" />
              </LinearGradient>
              <Text style={[styles.leaderName, e.isMe && { color: "#4dd45a" }]}>
                {e.name}{e.isMe ? " (You)" : ""}
              </Text>
              <Text style={styles.leaderScore}>{e.score.toLocaleString()}</Text>
            </LinearGradient>
          ))}
        </View>

        <TouchableOpacity style={styles.settingsBtn}>
          <LinearGradient colors={["#0e3d6e","#091d3a"]} style={styles.settingsBtnIn}>
            <Ionicons name="settings-outline" size={18} color="#b0d4ff" />
            <Text style={styles.settingsTxt}>Settings</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 10, paddingTop: 14, gap: 14 },

  profileCard: {
    borderRadius: 20, padding: 20, alignItems: "center", gap: 8,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  avatarRing: { width: 88, height: 88, borderRadius: 44, padding: 3, alignItems: "center", justifyContent: "center" },
  avatar: { flex: 1, width: "100%", borderRadius: 40, alignItems: "center", justifyContent: "center" },
  profileName: { color: "#fff", fontSize: 22, fontWeight: "700", fontFamily: "Inter_700Bold" },
  levelPill: { borderRadius: 14, paddingHorizontal: 16, paddingVertical: 5 },
  levelTxt: { color: "#ffd200", fontWeight: "700", fontFamily: "Inter_700Bold", fontSize: 13 },
  xpBarWrap: {
    height: 8, width: "90%", backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 4, overflow: "hidden",
  },
  xpFill: { height: "100%", borderRadius: 4 },
  xpTxt: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Inter_400Regular" },

  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  statBox: {
    flex: 1, minWidth: "45%", borderRadius: 14, padding: 14,
    alignItems: "center", gap: 4,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  statVal: { fontSize: 20, fontWeight: "700", fontFamily: "Inter_700Bold" },
  statLbl: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Inter_400Regular" },

  sectionTitle: { color: "#fff", fontSize: 15, fontWeight: "700", fontFamily: "Inter_700Bold" },

  badgesRow: { flexDirection: "row", gap: 8 },
  badgeCard: {
    flex: 1, borderRadius: 12, padding: 10,
    alignItems: "center", gap: 4,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.12)",
  },
  badgeLocked: { opacity: 0.45 },
  badgeName: { color: "#fff", fontSize: 10, fontFamily: "Inter_500Medium", textAlign: "center" },

  leaderList: { gap: 5 },
  leaderRow: {
    flexDirection: "row", alignItems: "center", borderRadius: 12,
    padding: 9, gap: 9, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)",
  },
  leaderMeRow: { borderColor: "#4dd45a" },
  rankBadge: {
    width: 27, height: 27, borderRadius: 13.5,
    alignItems: "center", justifyContent: "center",
  },
  rankNum: { color: "#fff", fontSize: 11, fontWeight: "700", fontFamily: "Inter_700Bold" },
  leaderAva: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center" },
  leaderName: { flex: 1, color: "#fff", fontSize: 13, fontFamily: "Inter_500Medium" },
  leaderScore: { color: "#ffd200", fontWeight: "700", fontFamily: "Inter_700Bold", fontSize: 13 },

  settingsBtn: { borderRadius: 16, overflow: "hidden" },
  settingsBtnIn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    paddingVertical: 14, gap: 8,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", borderRadius: 16,
  },
  settingsTxt: { color: "#b0d4ff", fontSize: 14, fontFamily: "Inter_600SemiBold" },
});
