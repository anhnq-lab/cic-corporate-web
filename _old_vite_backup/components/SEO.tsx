import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
}) => {
    const siteTitle = 'BIM & Digital Twin Hub Vietnam';
    const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || 'Trung tâm Kiến thức và Dịch vụ BIM & Digital Twin hàng đầu tại Việt Nam. Cung cấp giải pháp, đào tạo và tư vấn chuyển đổi số ngành xây dựng.';
    const metaKeywords = keywords || 'BIM, Digital Twin, Construction, Vietnam, Digital Transformation, Consulting, Training';
    const metaImage = image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070'; // Default Tech/Construction image
    const metaUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph Metadata (Facebook, LinkedIn) */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter Card Metadata */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default SEO;
