// src/components/GoogleAd.tsx
'use client';
import Script from 'next/script';

const GoogleAd = () => (
  <div className="ad-container">
    {/* Este script carrega a biblioteca de anúncios do Google */}
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      strategy="afterInteractive" // Carrega depois que a página se torna interativa
    />
    {/* Este é o bloco de anúncio que o script irá preencher */}
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
         data-ad-slot="1234567890"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <Script id="init-ads" strategy="afterInteractive">
      {`(adsbygoogle = window.adsbygoogle || []).push({});`}
    </Script>
  </div>
);

export default GoogleAd;