import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useProfile } from '../../hooks/useProfile';
import { useSession } from '../../context/SessionProvider';
import { useTheme } from '../../utils/theme';
import CustomInput from '../../components/CustomInput';
import { useState, useEffect } from 'react';
import { updateUserProfile } from '../../services/profile';
import CustomButton from '../../components/CustomButton';

const Profile = () => {
  const { session } = useSession();
  const styles = useThemedStyles();
  const user_id = session?.user?.id;

  const {
    data: profile,
    isLoading,
    refetch,
    error: prloadError,
  } = useProfile(user_id);

  console.log('Profile', profile, JSON.stringify(prloadError));

  const [pr, setPr] = useState({
    fullname: '',
    avatarUrl: '',
    isPremium: false,
    currency: '',
    monthlyIncome: '',
  });

  useEffect(() => {
    if (!profile) return;
    setPr({
      fullname: profile.full_name || '',
      avatarUrl: profile.avatar_url || '',
      isPremium: profile.is_premium || '',
      currency: profile.currency || '',
      monthlyIncome: profile.monthly_income || '',
    });
  }, [profile]);

  const handleUpdate = async () => {
    if (!user_id) return;

    const { error } = await updateUserProfile(user_id, pr);

    if (error) console.log('Update Error:', error);
    else {
      refetch();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={styles.text.color} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <CustomInput
          label="Full Name"
          placeholder="Enter Full Name"
          value={pr.fullname}
          onChangeText={text => setPr({ ...pr, fullname: text })}
          leftIcon="user"
        />
        <CustomInput
          label="monthly income"
          placeholder="Enter monthly income"
          value={pr.monthlyIncome}
          keyboardType="number-pad"
          onChangeText={text => setPr({ ...pr, monthlyIncome: text })}
          leftIcon="smile"
        />

        {/*<CustomInput
          label="Bio"
          placeholder="Write something..."
          value={pr.bio}
          onChangeText={text => setPr({ ...pr, bio: text })}
          multiline
          inputStyle={{ height: 100, paddingTop: 12 }}
          leftIcon="edit-2"
        />*/}
      </View>
      <CustomButton title="update profile" onPress={handleUpdate} />
    </View>
  );
};

const useThemedStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'space-between',
    },
    header: {
      fontSize: 22,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 16,
    },
    text: {
      color: theme.text,
    },
  });
};

export default Profile;
