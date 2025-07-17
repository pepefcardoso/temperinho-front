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

/**
 * Componente para renderizar um bloco de anúncio do Google AdSense.
 * Ele reinicializa o anúncio se as propriedades (slot, format, etc.) mudarem.
 */
const GoogleAd = ({
  slot,
  adFormat = "auto",
  responsive = true
}: GoogleAdProps): JSX.Element => {

  const adClient = process.env.NEXT_PUBLIC_GOOGLE_AD_CLIENT;
  if (!adClient) {
    console.error("A variável de ambiente NEXT_PUBLIC_GOOGLE_AD_CLIENT não está definida.");
    return <div className="ad-placeholder" style={{ display: 'none' }}>Ad client not configured</div>;
  }

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Erro ao carregar anúncio do Google:", err);
    }
  }, [slot, adFormat, responsive]);

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