import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { fonts, fontSize } from '../../utils/fonts';
import { useTheme } from '../../utils/theme';
import CustomInput from '../../components/CustomInput';
import { useState } from 'react';
import { loginUser } from '../../services/auth';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { useMutation } from '@tanstack/react-query';

import { useSession } from '../../context/SessionProvider';

const Login = () => {
  const styles = useThemedStyles();
  const navigate = useNavigation();
  const { refetch } = useSession();
  const [name, setName] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string>('');

  const mutate = useMutation({
    mutationFn: loginUser,
    onError: res => console.error('error', res?.message),
    onSuccess: () => refetch(),
  });

  const onPressNavigate = () => {
    navigate.navigate('signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyles}>
        Welcome back user, idk your name but i will find you...
      </Text>
      <KeyboardAvoidingView behavior="padding" style={{ marginTop: 10 }}>
        <CustomInput
          label="email"
          placeholder="email@example.com"
          value={name}
          onChangeText={setName}
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
        title="Log In"
        onPress={() => mutate.mutate({ email: name, password: password })}
        size="large"
        leftIcon="send"
        style={{ marginTop: 5 }}
      />
      <View style={styles.containAccount}>
        <Text style={styles.containAccountText}>dont have an account?</Text>
        <TouchableOpacity onPress={onPressNavigate}>
          <Text style={styles.containAccountTextLogin}>singup</Text>
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
      fontSize: fontSize.base,
      color: 'red',
      textTransform: 'capitalize',
      marginBottom: 10,
    },
  });
};

export default Login;
