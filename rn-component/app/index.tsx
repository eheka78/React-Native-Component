import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Login from './../components/Login';
import BarGraph from './../components/BarGraph';
import SemicircleGraph from './../components/SemicircleGraph';
import Roulette from './../components/Roulette';
import Roulette2 from './../components/Roulette2';
import BarGraph2 from './../components/BarGraph2';
import Calendar from './../components/Calendar'

export default function TabOneScreen() {
  const scrollRef = useRef<ScrollView>(null);

  // 각 섹션의 Y 좌표 저장
  const [positions, setPositions] = useState<{ [key: string]: number }>({});
  const [showButton, setShowButton] = useState(false);

  const handleLayout = (name: string, event: any) => {
    const y = event.nativeEvent.layout.y;
    setPositions((prev) => ({ ...prev, [name]: y }));
  };

  const handleScroll = (event: any) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setShowButton(yOffset > 110);
  };

  const scrollTo = (name: string) => {
    const y = positions[name];
    if (y !== undefined) {
      scrollRef.current?.scrollTo({ y, animated: true });
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* 제목 */}
          <View>
            <Text style={styles.title}>React Native Components</Text>
          </View>

          {/* 섹션 이동 버튼 */}
          <View style={styles.buttonRow}>
            <Button title="로그인" onPress={() => scrollTo('login')} />
            <Button title="캘린더" onPress={() => scrollTo('calendar')} />
            <Button title="막대 그래프" onPress={() => scrollTo('bar-graph')} />
            <Button title="반원 그래프" onPress={() => scrollTo('semicircle-graph')} />
          </View>
          <View style={styles.buttonRow}>
            <Button title="막대 그래프2" onPress={() => scrollTo('bar-graph2')} />
            <Button title="룰렛" onPress={() => scrollTo('roulette')} />
            <Button title="룰렛2" onPress={() => scrollTo('roulette2')} />
          </View>


          <View
            onLayout={(e) => handleLayout('login', e)}
            style={[styles.section, { borderColor: '#ffe5ec' }]}
          >
            <Text>로그인</Text>
            <Login />
          </View>


          <View
            onLayout={(e) => handleLayout('calendar', e)}
            style={[styles.section, { borderColor: '#ffe5ec' }]}
          >
            <Text>캘린더</Text>
            <Calendar />
          </View>


          <View
            onLayout={(e) => handleLayout('bar-graph', e)}
            style={[styles.section, { borderColor: '#bde0fe' }]}
          >
            <Text>막대 그래프</Text>
            <BarGraph />
          </View>

          <View
            onLayout={(e) => handleLayout('semicircle-graph', e)}
            style={[styles.section, { borderColor: '#caffbf' }]}
          >
            <Text>반원 그래프</Text>
            <SemicircleGraph />
          </View>

          <View
            onLayout={(e) => handleLayout('bar-graph2', e)}
            style={[styles.section, { borderColor: '#bde0fe' }]}
          >
            <Text>막대 그래프2</Text>
            <BarGraph2 />
          </View>

          <View
            onLayout={(e) => handleLayout('roulette', e)}
            style={[styles.section, { borderColor: '#caffbf' }]}
          >
            <Text>룰렛1</Text>
            <Roulette />
          </View>

          <View
            onLayout={(e) => handleLayout('roulette2', e)}
            style={[styles.section, { borderColor: '#caffbf' }]}
          >
            <Text>룰렛2</Text>
            <Roulette2 />
          </View>          
        </ScrollView>



        {/* 오른쪽 아래 맨 위로 버튼 */}
        {showButton && (
          <TouchableOpacity style={styles.scrollTopButton} onPress={scrollToTop}>
            <Text style={styles.scrollTopText}>↑</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  section: {
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollTopButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#5c85ffb6',
    borderRadius: 10000,
    padding: 12,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  scrollTopText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
