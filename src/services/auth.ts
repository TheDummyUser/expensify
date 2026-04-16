import { supabase } from '../../lib/supabase';

export const signUpAndLoginUser = async ({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        displayName,
      },
    },
  });

  if (error) throw error;

  return data;
};

export const checkIfLoggedIn = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) throw error;

  return data;
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;

  return data;
};
