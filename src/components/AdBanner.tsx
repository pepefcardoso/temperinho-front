import { ExternalLink } from 'lucide-react';

interface AdBannerProps {
    size?: 'small' | 'medium' | 'large';
    position?: 'top' | 'middle' | 'bottom' | 'sidebar';
    className?: string;
}

const AdBanner = ({ size = 'medium', position = 'middle', className = '' }: AdBannerProps) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'small':
                return 'h-20 md:h-24';
            case 'large':
                return 'h-32 md:h-40';
            default:
                return 'h-24 md:h-32';
        }
    };

    const getPositionClasses = () => {
        switch (position) {
            case 'sidebar':
                return 'max-w-xs';
            default:
                return 'max-w-4xl mx-auto';
        }
    };

    return (
        <div className={`${getPositionClasses()} ${className}`}>
            <div className={`${getSizeClasses()} bg-gradient-to-r from-warm-100 to-sage-100 border-2 border-dashed border-warm-300 rounded-xl flex items-center justify-center text-warm-600 hover:border-sage-400 transition-colors duration-200 group cursor-pointer`}>
                <div className="text-center">
                    <ExternalLink className="h-6 w-6 mx-auto mb-2 group-hover:text-sage-600 transition-colors" />
                    <p className="text-sm font-medium group-hover:text-sage-600 transition-colors">
                        Espaço Publicitário
                    </p>
                    <p className="text-xs text-warm-500">
                        {position === 'sidebar' ? 'Banner Lateral' : 'Banner Principal'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdBanner;