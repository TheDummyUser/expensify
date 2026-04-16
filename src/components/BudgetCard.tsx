import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../utils/theme';
import { fonts, fontSize } from '../utils/fonts';
import Icon from 'react-native-vector-icons/Feather';
import React from 'react';

interface BudgetCardProps {
  monthYear?: string;
  budget?: string;
  spent?: string;
  onPress?: () => void;
}

const BudgetCard: React.FC<BudgetCardProps> = ({
  monthYear,
  budget,
  spent,
  onPress,
}) => {
  const styles = usethemedStyles();
  return (
    <View style={[styles.cardContainer, { justifyContent: 'space-between' }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.txt}>ur Montly budget of</Text>
        <Text style={[styles.txt, { fontSize: fontSize.base }]}>
          {monthYear}
        </Text>
      </View>
      <Pressable
        onLongPress={onPress}
        delayLongPress={500}
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          height: '60%',
        }}
      >
        <Text style={[styles.txt, { fontSize: 60 }]}>₹ {budget}/...</Text>
      </Pressable>
      <View style={styles.cardHeader}>
        <Text style={[styles.txt, { fontSize: fontSize.base }]}>
          money burned so far...
        </Text>
        <View style={[styles.cardHeader, { gap: 10, alignItems: 'center' }]}>
          <Text style={[styles.txt, styles.down]}>₹ {spent}/...</Text>
          <Icon name="arrow-down" size={24} color={styles.down.color} />
        </View>
      </View>
    </View>
  );
};

export default BudgetCard;

const usethemedStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    cardContainer: {
      height: '40%',
      width: '95%',
      backgroundColor: theme.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.borderStrong,
      alignSelf: 'center',
      borderRadius: 16,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    txt: {
      fontFamily: fonts.regular,
      fontSize: fontSize.xl,
      color: theme.textSoft,
      textTransform: 'capitalize',
    },
    cardHeader: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    down: {
      color: theme.error,
    },
  });
};
