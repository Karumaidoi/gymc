import { getToday } from '../utils/helpers';
import { supabaseUrl, supabase, supabaseKey } from './supabase';

export async function getBooks() {
  const { data, error } = await supabase.from('center').select().order('id', { ascending: false });

  console.log(data);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteOrder(id) {
  const { error } = await supabase.from('center').delete().eq('id', id);

  if (error) throw new Error(error.message);
}

export async function createBook(newProject) {
  const projectName = `${Math.random()}-${newProject.image.name}`.replaceAll('/', '');

  const projectPath = `${supabaseKey}/storage/v1/object/public/projectImages/${projectName}`;

  const { data, error } = await supabase.from('center').insert([{ ...newProject, image: projectPath }]);

  if (error) {
    throw new Error(error.message);
  }

  const { error: storageError } = await supabase.storage.from('projectImages').upload(projectName, newProject.image, {
    cacheControl: '3600',
    upsert: false,
  });

  if (storageError) {
    console.log(storageError);
    throw Error('Course Files could not be created');
  }

  return data;
}

export async function getBooksByDate(date) {
  const { data, error } = await supabase
    .from('Orders')
    .select()
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateOrder(newOrder) {
  console.log(newOrder);
  const orderUpdated = newOrder.newBook;
  const { orderId } = newOrder;

  console.log(orderId, orderUpdated);

  const { data, error } = await supabase.from('center').update(orderUpdated).eq('id', orderId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
