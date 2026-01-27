import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  artist = null 
}) => {
  const siteUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'https://scotbase.co.uk';
  }, []);

  const fullUrl = useMemo(() => {
    return url ? `${siteUrl}${url}` : siteUrl;
  }, [siteUrl, url]);

  const imageUrl = useMemo(() => {
    if (image) {
      return image.startsWith('http') ? image : `${siteUrl}${image}`;
    }
    return `${siteUrl}/images/scotbase-logo.png`;
  }, [siteUrl, image]);
  
  const defaultTitle = 'Scotbase - Scotland\'s Premier Tribute Act Booking Agency';
  const defaultDescription = 'Book professional tribute acts, dinner speakers, and themed night experiences across Scotland. Quality entertainment for weddings, corporate events, and private parties.';
  
  const seoTitle = useMemo(() => {
    return title ? `${title} | Scotbase` : defaultTitle;
  }, [title]);

  const seoDescription = useMemo(() => {
    return description || defaultDescription;
  }, [description]);

  // Structured data for organization
  const organizationSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "name": "Scotbase",
    "description": "Scotland's premier tribute act booking agency",
    "url": siteUrl,
    "logo": `${siteUrl}/images/scotbase-logo.png`,
    "sameAs": [
      // Add social media links here if available
    ]
  }), [siteUrl]);

  // Structured data for artist/act (if provided)
  const artistSchema = useMemo(() => {
    if (!artist) return null;
    return {
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      "name": artist.name,
      "description": artist.description || `${artist.name} - Professional tribute act available for booking`,
      "image": artist.image ? (artist.image.startsWith('http') ? artist.image : `${siteUrl}${artist.image}`) : undefined,
      "genre": artist.genre || artist.act_genre?.[0],
      "url": `${siteUrl}/artist/${artist.id}`
    };
  }, [artist, siteUrl]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content="tribute acts, entertainment booking, Scotland, wedding entertainment, corporate events, dinner speakers, themed nights" />
      <meta name="author" content="Scotbase" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Scotbase" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema, null, 0)}
      </script>
      {artistSchema && (
        <script type="application/ld+json">
          {JSON.stringify(artistSchema, null, 0)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

