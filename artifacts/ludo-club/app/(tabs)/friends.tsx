import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { GameBackground } from "@/components/GameBackground";
import { TopBar } from "@/components/TopBar";

interface Friend {
  id: string; name: string; level: number;
  status: "online" | "offline" | "playing"; wins: number;
}

const FRIENDS: Friend[] = [
  { id: "f1", name: "ArjunK",  level: 45, status: "online",  wins: 234 },
  { id: "f2", name: "PriyaS",  level: 28, status: "playing", wins: 189 },
  { id: "f3", name: "RahulM",  level: 61, status: "offline", wins: 412 },
  { id: "f4", name: "AnikaR",  level: 17, status: "online",  wins: 87  },
  { id: "f5", name: "VikramB", level: 52, status: "playing", wins: 305 },
  { id: "f6", name: "SnehaP",  level: 33, status: "offline", wins: 176 },
  { id: "f7", name: "KaranD",  level: 40, status: "online",  wins: 221 },
];

const STATUS_C = { online: "#4dd45a", playing: "#ffc107", offline: "#556" };

function FriendRow({ friend }: { friend: Friend }) {
  return (
    <LinearGradient colors={["#0e3d6e","#091d3a"]} style={styles.row}>
      <View style={styles.avaWrap}>
        <LinearGradient colors={["#2979ff","#1a237e"]} style={styles.ava}>
          <Ionicons name="person" size={20} color="#fff" />
        </LinearGradient>
        <View style={[styles.dot, { backgroundColor: STATUS_C[friend.status] }]} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{friend.name}</Text>
        <Text style={styles.detail}>Lv. {friend.level} · {friend.wins} wins</Text>
      </View>
      <View style={styles.actions}>
        {friend.status === "playing" ? (
          <View style={[styles.statusChip, { backgroundColor: "#ffc107" }]}>
            <Text style={styles.chipTxt}>Playing</Text>
          </View>
        ) : friend.status === "online" ? (
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
          >
            <LinearGradient colors={["#4dd45a","#1b8a28"]} style={styles.playBtnIn}>
              <MaterialCommunityIcons name="gamepad-variant" size={14} color="#fff" />
              <Text style={styles.chipTxt}>Play</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={styles.giftBtn}>
          <MaterialCommunityIcons name="gift-outline" size={19} color="#ffd200" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default function FriendsScreen() {
  const [search, setSearch] = useState("");
  const filtered = FRIENDS.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
  const bottomPad = Platform.OS === "web" ? 84 + 34 : 84;
  const onlineCount = FRIENDS.filter((f) => f.status === "online").length;
  const playingCount = FRIENDS.filter((f) => f.status === "playing").length;

  return (
    <View style={{ flex: 1, backgroundColor: "#1565c0" }}>
      <GameBackground />
      <TopBar />

      <View style={styles.searchRow}>
        <LinearGradient colors={["#0e3d6e","#091d3a"]} style={styles.searchBar}>
          <Ionicons name="search" size={15} color="rgba(255,255,255,0.5)" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search friends..."
            placeholderTextColor="rgba(255,255,255,0.35)"
            value={search}
            onChangeText={setSearch}
          />
        </LinearGradient>
        <TouchableOpacity
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        >
          <LinearGradient colors={["#4dd45a","#1b8a28"]} style={styles.addBtn}>
            <Ionicons name="person-add" size={19} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        {[
          { label: "Friends", val: FRIENDS.length, color: "#ffd200" },
          { label: "Online",  val: onlineCount,     color: "#4dd45a" },
          { label: "Playing", val: playingCount,     color: "#ffc107" },
        ].map((s) => (
          <LinearGradient key={s.label} colors={["#0e3d6e","#091d3a"]} style={styles.statCard}>
            <Text style={[styles.statVal, { color: s.color }]}>{s.val}</Text>
            <Text style={styles.statLbl}>{s.label}</Text>
          </LinearGradient>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <FriendRow friend={item} />}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!!filtered.length}
        ItemSeparatorComponent={() => <View style={{ height: 7 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={44} color="rgba(255,255,255,0.25)" />
            <Text style={styles.emptyTxt}>No friends found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: { flexDirection: "row", padding: 10, gap: 8, alignItems: "center" },
  searchBar: {
    flex: 1, flexDirection: "row", alignItems: "center",
    borderRadius: 24, paddingHorizontal: 12, paddingVertical: 9,
    gap: 8, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
  },
  searchInput: { flex: 1, color: "#fff", fontSize: 14, fontFamily: "Inter_400Regular" },
  addBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },

  statsRow: { flexDirection: "row", paddingHorizontal: 10, gap: 8, marginBottom: 10 },
  statCard: { flex: 1, borderRadius: 12, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)" },
  statVal: { fontSize: 20, fontWeight: "700", fontFamily: "Inter_700Bold" },
  statLbl: { color: "rgba(255,255,255,0.55)", fontSize: 11, fontFamily: "Inter_400Regular" },

  list: { paddingHorizontal: 10 },
  row: {
    flexDirection: "row", borderRadius: 14, padding: 11,
    alignItems: "center", gap: 11,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  avaWrap: { position: "relative" },
  ava: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center" },
  dot: { position: "absolute", bottom: 0, right: 0, width: 11, height: 11, borderRadius: 5.5, borderWidth: 2, borderColor: "#091d3a" },
  info: { flex: 1 },
  name: { color: "#fff", fontSize: 14, fontWeight: "700", fontFamily: "Inter_700Bold" },
  detail: { color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Inter_400Regular", marginTop: 1 },
  actions: { flexDirection: "row", alignItems: "center", gap: 7 },
  statusChip: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  chipTxt: { color: "#fff", fontSize: 10, fontWeight: "700", fontFamily: "Inter_700Bold" },
  playBtn: { borderRadius: 16, overflow: "hidden" },
  playBtnIn: { flexDirection: "row", alignItems: "center", paddingHorizontal: 9, paddingVertical: 5, gap: 4 },
  giftBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },

  empty: { alignItems: "center", paddingTop: 60, gap: 10 },
  emptyTxt: { color: "rgba(255,255,255,0.35)", fontSize: 14, fontFamily: "Inter_400Regular" },
});
