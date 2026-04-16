import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { useTheme } from '../../utils/theme';
import { useSession } from '../../context/SessionProvider';
import { fonts, fontSize } from '../../utils/fonts';
import BudgetCard from '../../components/BudgetCard';
import { useEffect, useState } from 'react';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { BottomSheet } from '../../components/BottomSheet';
import { useCreateMonthlyBudget, useGetBudget } from '../../hooks/useExpences';
import Icon from 'react-native-vector-icons/Feather';

const Home = () => {
  const [open, setOpen] = useState(false);

  const { session } = useSession();
  const styles = useThemedStyles();
  const user_id = session?.user?.id;

  const {
    data: budget,
    error,
    isLoading: budgetLoading,
    refetch: budgetRefetch,
  } = useGetBudget(user_id);

  const createBudget = useCreateMonthlyBudget();

  const [budgetAmout, setBudgetAmout] = useState<number>(
    budget?.budget_amount || 0,
  );
  const loading = budgetLoading;

  useEffect(() => {
    if (!loading && budget == null) {
      setOpen(true);
    }
  }, [loading, budget]);

  return (
    <View style={styles.container}>
      <BudgetCard
        budget={budget?.budget_amount}
        monthYear={`[${budget?.month}/${budget?.year}]`}
        spent={'1000'}
        onPress={() => {
          Vibration.vibrate(10);
          setOpen(true);
        }}
      />

      <BottomSheet visible={open} onClose={() => setOpen(false)} height={220}>
        <View style={{ paddingHorizontal: 10, gap: 5 }}>
          <CustomInput
            placeholder="Enter Your Budget"
            value={budgetAmout}
            onChangeText={setBudgetAmout}
            keyboardType="number-pad"
          />

          <CustomButton
            title="cancel"
            style={styles.bottomBarButtonStyle2}
            textStyle={styles.text}
            onPress={() => setOpen(false)}
          />

          <CustomButton
            title="submit"
            style={styles.bottomBarButtonStyle}
            textStyle={styles.errTxt}
            onPress={() => {
              if (budgetAmout != 0) {
                createBudget.mutate(
                  { userId: user_id, amount: budgetAmout },
                  {
                    onSuccess: () => {
                      budgetRefetch();
                      setOpen(false);
                    },
                    onError: err => console.warn(err.message),
                  },
                );
              }
            }}
          />
        </View>
      </BottomSheet>

      <View style={styles.cardContainer}>
        <Text style={[styles.text, { fontSize: fontSize.large }]}>
          Top 5 Transactioons of the month
        </Text>
      </View>

      <TouchableOpacity style={styles.plusButton}>
        <Icon name={'plus'} size={25} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const useThemedStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    errTxt: {
      color: 'red',
      fontFamily: fonts.regular,
      fontSize: fontSize.base,
    },
    text: {
      fontFamily: fonts.regular,
      color: theme.text,
      fontSize: fontSize.base,
      textTransform: 'capitalize',
    },
    bottomSheet: {
      backgroundColor: theme.surface2,
      flex: 1,
      alignSelf: 'center',
    },
    bottonSheetView: {
      backgroundColor: theme.surface2,
      flex: 1,
      width: '100%',
      paddingHorizontal: 10,
    },
    bottomBarButtonStyle: {
      backgroundColor: theme.text,
      marginBottom: 10,
    },
    bottomBarButtonStyle2: {
      backgroundColor: theme.error,
    },
    plusButton: {
      backgroundColor: theme.surface,
      height: 60,
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 16,
      position: 'absolute',
      bottom: 20,
      right: 20,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.borderStrong,
      borderCurve: 'continuous',
    },
    cardContainer: {
      marginTop: 3,
      height: '45%',
      width: '95%',
      backgroundColor: theme.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.borderStrong,
      alignSelf: 'center',
      borderRadius: 16,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
  });
};

export default Home;
