import React, { useRef, useState } from "react";
import { View, Animated, Button, Image, StyleSheet, Easing, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const images = [
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
  require("../assets/img.png"),
];

const ITEM_HEIGHT = 150; // 이미지 높이
const VISIBLE_COUNT = 3; // 화면에 보이는 이미지 개수

const Roulette = () => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [isSpinning, setIsSpinning] = useState(false);

  const startDraw = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const selectedIndex = Math.floor(Math.random() * images.length); // 랜덤 선택
    const totalItems = images.length * 10; // 충분히 돌릴 아이템 수 (10바퀴 정도)
    const endPosition = -ITEM_HEIGHT * (totalItems + selectedIndex);

    Animated.timing(translateY, {
      toValue: endPosition,
      duration: 4000 + Math.random() * 2000, // 랜덤 지속시간
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      // 끝난 후 선택 이미지 위치로 보정
      translateY.setValue(-ITEM_HEIGHT * selectedIndex);
      setIsSpinning(false);
      alert(`뽑힌 이미지: ${selectedIndex + 1}`);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.rouletteContainer}>
        <Animated.View
          style={{
            transform: [{ translateY }],
          }}
        >
          {Array.from({ length: 10 }).flatMap(() => images).map((img, index) => (
            <Image key={index} source={img} style={styles.image} />
          ))}
        </Animated.View>
      </View>

      <Button title="뽑기" onPress={startDraw} disabled={isSpinning} />
    </View>
  );
};

export default Roulette;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rouletteContainer: {
    height: ITEM_HEIGHT * VISIBLE_COUNT,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: ITEM_HEIGHT,
    resizeMode: "contain",
  },
});
