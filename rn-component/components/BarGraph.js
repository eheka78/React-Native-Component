import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const data = [
  { value: 463456, label: '1월', frontColor: '#DEE9FF' },
  { value: 345365, label: '2월', frontColor: '#4d85ff' },
  { value: 375365, label: '3월', frontColor: '#DEE9FF' },
];


const BarGraph = () => {
  // react-native-gifted-charts
  // npx expo install react-native-gifted-charts expo-linear-gradient react-native-svg
  // https://github.com/Abhinandan-Kushwaha/react-native-gifted-charts/blob/HEAD/docs/BarChart/BarChartProps.md

  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>
        월별 소비
      </Text>

      <BarChart
        data={data}
        barWidth={40}
        spacing={20}
        roundedTop
        barRadius={4}        // 막대 윗부분 radius 작게
        showValuesOnTopOfBars
        hideYAxisText={true}
      />
    </View>
  );
};

export default BarGraph;
