import { createClient } from '@/utils/supabase/server'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const baseUrl = 'https://padashjoo.ir'; // Update this when you deploy!

  // 1. Fetch Categories
  const { data: categories } = await supabase.from('categories').select('slug, created_at');
  
  // 2. Fetch Blog Posts
  const { data: posts } = await supabase.from('posts').select('slug, created_at');

  // 3. Build the Routes
  const categoryUrls = categories?.map((category) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(category.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || [];

  const postUrls = posts?.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })) || [];

  // 4. Return the full map
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...categoryUrls,
    ...postUrls,
  ]
}