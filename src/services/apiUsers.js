/* eslint-disable object-shorthand */
import { getToday } from '../utils/helpers';
import { supabase } from './supabase';

export async function signUp({ email, userName, password, phone, description }) {
  console.log(email, userName);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        userName,
      },
    },
  });

  if (error) {
    throw new Error(error?.message);
  }

  try {
    await addUsers(email, phone, userName, description);
  } catch (error) {
    throw new Error(error);
  }

  return data;
}

export async function logIn({ email, password }) {
  console.log(email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function addUsers(email, phone, userName, description) {
  const { data, error } = await supabase.from('Users').insert({
    email,
    phone,
    description,
    userName,
    isAdmin: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUsers() {
  const { data, error } = await supabase.from('Users').select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUsersByDate(date) {
  const { data, error } = await supabase
    .from('Users')
    .select()
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteUser(id) {
  const { data, error } = await supabase.from('Users').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteCurrentAdmin(id) {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    await deleteUser(id);
  } catch (error) {
    throw new Error(error);
  }
}
