import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export function GameBackground() {
  const DOT_SPACING = 28;
  const ROWS = 35;
  const COLS = 16;

  const dots = useMemo(() => {
    const result: { top: number; left: number; key: string }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        result.push({ top: r * DOT_SPACING, left: c * DOT_SPACING, key: `${r}-${c}` });
      }
    }
    return result;
  }, []);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {dots.map((d) => (
        <View
          key={d.key}
          style={[
            styles.dot,
            { top: d.top, left: d.left },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
});
