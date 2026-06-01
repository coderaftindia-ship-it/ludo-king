import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface InventoryItem {
  id: string;
  unlocked: boolean;
  equipped: boolean;
  progress: number;
}

interface GameState {
  coins: number;
  gems: number;
  username: string;
  level: number;
  avatarEmoji: string;
  inventory: Record<string, InventoryItem>;
  lastDailyBonusDay: number;
  currentDailyStreak: number;
  lastBonusDate: string;
  showDailyBonus: boolean;
  showRankingResult: boolean;
  ranking: { badge: string; previous: number; reward: number };
}

interface GameContextType extends GameState {
  addCoins: (amount: number) => void;
  addGems: (amount: number) => void;
  unlockItem: (id: string) => void;
  equipItem: (id: string) => void;
  addProgress: (id: string, amount: number) => void;
  claimDailyBonus: () => void;
  dismissDailyBonus: () => void;
  dismissRankingResult: () => void;
}

const DEFAULT_STATE: GameState = {
  coins: 1980000,
  gems: 340,
  username: "Player",
  level: 33,
  avatarEmoji: "🎮",
  inventory: {},
  lastDailyBonusDay: 2,
  currentDailyStreak: 2,
  lastBonusDate: "",
  showDailyBonus: true,
  showRankingResult: false,
  ranking: { badge: "Silver", previous: 2, reward: 200 },
};

const STORAGE_KEY = "@ludo_game_state";

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);

  useEffect(() => {
    loadState();
  }, []);

  async function loadState() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const today = new Date().toDateString();
        const showBonus = parsed.lastBonusDate !== today;
        setState({ ...DEFAULT_STATE, ...parsed, showDailyBonus: showBonus });
      }
    } catch {}
  }

  async function saveState(newState: GameState) {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {}
  }

  function update(patch: Partial<GameState>) {
    setState((prev) => {
      const next = { ...prev, ...patch };
      saveState(next);
      return next;
    });
  }

  function addCoins(amount: number) {
    update({ coins: state.coins + amount });
  }

  function addGems(amount: number) {
    update({ gems: state.gems + amount });
  }

  function unlockItem(id: string) {
    update({
      inventory: {
        ...state.inventory,
        [id]: { id, unlocked: true, equipped: false, progress: 50 },
      },
    });
  }

  function equipItem(id: string) {
    const newInventory = { ...state.inventory };
    Object.keys(newInventory).forEach((k) => {
      if (newInventory[k]) newInventory[k] = { ...newInventory[k], equipped: false };
    });
    newInventory[id] = { ...newInventory[id], id, unlocked: true, equipped: true, progress: 50 };
    update({ inventory: newInventory });
  }

  function addProgress(id: string, amount: number) {
    const current = state.inventory[id] ?? { id, unlocked: false, equipped: false, progress: 0 };
    const newProgress = Math.min(current.progress + amount, 50);
    const newInventory = {
      ...state.inventory,
      [id]: { ...current, progress: newProgress, unlocked: newProgress >= 50 },
    };
    update({ inventory: newInventory });
  }

  function claimDailyBonus() {
    const today = new Date().toDateString();
    const nextDay = Math.min(state.currentDailyStreak + 1, 7);
    const rewards: Record<number, { coins?: number; gems?: number }> = {
      1: { coins: 2000 },
      2: { gems: 150 },
      3: { coins: 4500 },
      4: { gems: 10 },
      5: { coins: 0 },
      6: { coins: 10000 },
      7: { coins: 0 },
    };
    const reward = rewards[state.lastDailyBonusDay + 1] ?? {};
    update({
      showDailyBonus: false,
      lastBonusDate: today,
      lastDailyBonusDay: nextDay,
      currentDailyStreak: nextDay,
      coins: state.coins + (reward.coins ?? 0),
      gems: state.gems + (reward.gems ?? 0),
    });
  }

  function dismissDailyBonus() {
    update({ showDailyBonus: false });
  }

  function dismissRankingResult() {
    update({ showRankingResult: false });
  }

  return (
    <GameContext.Provider
      value={{
        ...state,
        addCoins,
        addGems,
        unlockItem,
        equipItem,
        addProgress,
        claimDailyBonus,
        dismissDailyBonus,
        dismissRankingResult,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be inside GameProvider");
  return ctx;
}
