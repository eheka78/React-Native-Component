import React, { useRef, useEffect, useState } from "react";
import { View, Animated, Button, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const BOX_SIZE = 300; // 박스 크기
const BALL_SIZE = 40; // 공 크기
const NUM_BALLS = 5;  // 공 개수

const RouletteBounce = () => {
  const [isRunning, setIsRunning] = useState(false);

  // 공 상태
  const balls = useRef(
    Array.from({ length: NUM_BALLS }, () => ({
      x: new Animated.Value(Math.random() * (BOX_SIZE - BALL_SIZE)),
      y: new Animated.Value(Math.random() * (BOX_SIZE - BALL_SIZE)),
      velocityX: (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1),
      velocityY: (Math.random() * 4 + 2) * (Math.random() < 0.5 ? 1 : -1),
    }))
  ).current;

  // 애니메이션 루프
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      balls.forEach((ball, i) => {
        let newX = ball.x._value + ball.velocityX;
        let newY = ball.y._value + ball.velocityY;

        // 벽 충돌 처리
        if (newX <= 0 || newX >= BOX_SIZE - BALL_SIZE) ball.velocityX *= -1;
        if (newY <= 0 || newY >= BOX_SIZE - BALL_SIZE) ball.velocityY *= -1;

        // 공끼리 충돌 처리 (단순 반사)
        balls.forEach((other, j) => {
          if (i === j) return;
          const dx = newX - other.x._value;
          const dy = newY - other.y._value;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < BALL_SIZE) {
            // 단순 속도 반전
            ball.velocityX *= -1;
            ball.velocityY *= -1;
          }
        });

        ball.x.setValue(newX);
        ball.y.setValue(newY);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (isRunning) animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {balls.map((ball, index) => (
          <Animated.Image
            key={index}
            source={require("../assets/img.png")}
            style={[
              styles.ball,
              { transform: [{ translateX: ball.x }, { translateY: ball.y }] },
            ]}
          />
        ))}
      </View>
      <Button title={isRunning ? "Stop" : "Start Draw"} onPress={() => setIsRunning(!isRunning)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 2,
    borderColor: "#000",
    position: "relative",
    overflow: "hidden",
    marginBottom: 20,
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    position: "absolute",
  },
});

export default RouletteBounce;
