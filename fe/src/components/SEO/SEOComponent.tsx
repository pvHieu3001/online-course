import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
}

const SEOComponent: React.FC<SEOProps> = ({
  title = 'Đồ Gỗ Hiệp Hồng - Thương Hiệu Đồ Gỗ Việt Nam Chất Lượng Cao',
  description = 'Đồ Gỗ Hiệp Hồng - Thương hiệu đồ gỗ Việt Nam uy tín, chất lượng cao. Chuyên cung cấp đồ gỗ nội thất, đồ gỗ mỹ nghệ, đồ gỗ công nghiệp với giá tốt nhất.',
  keywords = 'đồ gỗ, nội thất, đồ gỗ việt nam, đồ gỗ hiệp hồng, đồ gỗ mỹ nghệ, đồ gỗ công nghiệp, bàn ghế gỗ, tủ gỗ, giường gỗ',
  image = 'https://khoahocgiasieure.com/storage/concungusi-011.png',
  url = 'https://dogohiephong.com',
  type = 'website',
  structuredData
}) => {
  const fullUrl = url.startsWith('http') ? url : `https://dogohiephong.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://dogohiephong.com${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Đồ Gỗ Hiệp Hồng" />
      <meta property="og:locale" content="vi_VN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOComponent; 