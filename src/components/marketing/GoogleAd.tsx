'use client';

import { JSX, useEffect } from 'react';

interface GoogleAdProps {
  slot: string;
  adFormat?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: object[];
  }
}

const GoogleAd = ({
  slot,
  adFormat = "auto",
  responsive = true
}: GoogleAdProps): JSX.Element => {
  const adClient = process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT;

  useEffect(() => {
    if (!adClient) {
      console.error("NEXT_PUBLIC_GOOGLE_AD_CLIENT não está definido, pulando AdSense.");
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Erro ao carregar anúncio do Google:", err);
    }
  }, [adClient, slot, adFormat, responsive]);

  if (!adClient) {
    return (
      <div className="ad-placeholder" style={{ display: 'none' }}>
        Ad client not configured
      </div>
    );
  }

  return (
    <div className="ad-container" style={{ overflow: 'hidden', textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive.toString()}
      ></ins>
    </div>
  );
};

export default GoogleAd;
