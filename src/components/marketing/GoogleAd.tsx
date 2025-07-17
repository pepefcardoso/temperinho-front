'use client';

import { useEffect } from 'react';

interface GoogleAdProps {
  slot: string;
  adFormat?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

const GoogleAd = ({ slot, adFormat = "auto", responsive = true }: GoogleAdProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Erro ao carregar anúncio do Google:", err);
    }
  }, []);

  return (
    <div className="ad-container" style={{ overflow: 'hidden', textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive.toString()}
      ></ins>
    </div>
  );
};

export default GoogleAd;