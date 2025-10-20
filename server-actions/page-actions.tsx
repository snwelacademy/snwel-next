'use server'
 
import { revalidatePath } from 'next/cache'
 
export async function inavlidateHomePage() {
  // Invalidate the /posts route in the cache
  revalidatePath('/')
}