import React from 'react';

export const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tech Taste Foods",
    "url": "https://techtastefoods.com",
    "logo": "https://techtastefoods.com/src/assets/icons/ttf_logo.svg",
    "description": "Helping restaurants grow since 2014. We provide food business consulting, marketing, and operations solutions.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9643422824",
      "contactType": "customer service",
      "email": "admin@techtastefoods.com"
    },
    "sameAs": [
      "https://www.instagram.com/techtastefoods/"
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Restaurant Growth Services",
    "provider": {
      "@type": "Organization",
      "name": "Tech Taste Foods"
    },
    "description": "We help restaurants, cloud kitchens, and food brands grow by improving menus, fixing operations, and running marketing that brings real results.",
    "offers": {
      "@type": "Offer",
      "category": "Restaurant Consulting Services"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </>
  );
}; 