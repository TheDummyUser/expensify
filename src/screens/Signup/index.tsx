import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  KeyboardAvoidingView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import { fonts, fontSize } from '../../utils/fonts';
import { useTheme } from '../../utils/theme';
import CustomInput from '../../components/CustomInput';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { useMutation } from '@tanstack/react-query';
import { signUpAndLoginUser } from '../../services/auth';
import { useSession } from '../../context/SessionProvider';

const Signup = () => {
  const styles = useThemedStyles();
  const navigate = useNavigation();
  const { refetch } = useSession();
  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>('');

  const mutate = useMutation({
    mutationFn: signUpAndLoginUser,
    onSuccess: () => refetch(),
    onError: res => console.error(res?.message),
  });

  const onPressNavigate = () => {
    navigate.navigate('login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>
        Welcome to the next gen expense tracker...
      </Text>
      <KeyboardAvoidingView behavior="padding" style={{ marginTop: 10 }}>
        <CustomInput
          label="name"
          placeholder="enter your name"
          value={displayName}
          onChangeText={setDisplayName}
          leftIcon="user"
        />

        <CustomInput
          label="email"
          placeholder="email@example.com"
          value={email}
          onChangeText={setEmail}
          leftIcon="user"
        />

        <CustomInput
          label="Password"
          placeholder="Enter password"
          secureTextEntry={!showPassword}
          rightIcon={showPassword ? 'eye-off' : 'eye'}
          value={password}
          onChangeText={setPassword}
          leftIcon="lock"
          onPressRightIcon={() => setShowPassword(!showPassword)}
        />
      </KeyboardAvoidingView>
      {mutate?.error && (
        <Text style={styles.errTxt}>{mutate?.error?.message}</Text>
      )}
      <CustomButton
        title="Sign up"
        onPress={() => {
          if (displayName === '' || email === '' || password === '') {
            ToastAndroid.show('requires all the fields', 2000);
          } else {
            mutate.mutate({ email, displayName, password });
          }
        }}
        leftIcon="send"
        size="large"
        style={{ marginTop: 5 }}
      />

      <View style={styles.containAccount}>
        <Text style={styles.containAccountText}>already have an account?</Text>
        <TouchableOpacity onPress={onPressNavigate}>
          <Text style={styles.containAccountTextLogin}>login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const useThemedStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '95%',
      alignSelf: 'center',
    } as ViewStyle,
    textStyles: {
      fontSize: 50,
      fontFamily: fonts.regular,
      color: theme.text,
      textTransform: 'capitalize',
    } as TextStyle,
    containAccount: { marginTop: 20, flexDirection: 'row', gap: 6 },
    containAccountText: {
      fontFamily: fonts.italic,
      fontSize: fontSize.base,
      color: theme.textSoft,
      textTransform: 'capitalize',
    } as TextStyle,
    containAccountTextLogin: {
      fontFamily: fonts.italic,
      fontSize: fontSize.base,
      color: theme.textMuted,
      textTransform: 'capitalize',
    } as TextStyle,
    errTxt: {
      fontFamily: fonts.regular,
      color: 'red',
      textTransform: 'capitalize',
      fontSize: fontSize.base,
      marginBottom: 10,
    } as TextStyle,
  });
};

export default Signup;
