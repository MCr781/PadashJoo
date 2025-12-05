import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard/', // Don't let Google index private user dashboards
    },
    sitemap: 'https://padashjoo.ir/sitemap.xml', // We will update this domain later
  }
}