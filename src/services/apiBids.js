import { supabaseUrl, supabase, supabaseKey } from './supabase';

export async function getBids() {
  const { data, error } = await supabase.from('Orders').select();

  if (error) {
    throw new Error(error?.message);
  }

  return data;
}

export async function updateBid(newObj) {
  console.log(newObj.isVerified);

  const newData = { isVerified: newObj.isAccepted };

  const { data, error } = await supabase.from('Orders').update(newData).eq('id', newObj.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
