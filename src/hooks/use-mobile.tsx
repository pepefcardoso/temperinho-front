import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Hook customizado que verifica se a largura da tela corresponde a um dispositivo móvel.
 * @returns {boolean} Retorna `true` se a tela for considerada móvel, `false` caso contrário.
 */
export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return isMobile;
}