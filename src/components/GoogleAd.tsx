'use client';

import Script from 'next/script';

const GoogleAd = () => (
  <div className="ad-container">
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      strategy="afterInteractive"
    />
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