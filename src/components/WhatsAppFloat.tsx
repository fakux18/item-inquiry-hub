
import { useState } from 'react';
import { Phone, X } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("¡Hola! Estoy interesado en uno de sus productos. ¿Podrían ayudarme a encontrar lo que busco?");
    window.open(`https://wa.me/+5493775200964?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-mid-gray-blue text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-dark-charcoal transition-colors z-10"
        >
          <X className="w-3 h-3" />
        </button>

        {/* WhatsApp button */}
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3 group relative z-0"
        >
          <Phone className="w-6 h-6" />
          <span className="hidden group-hover:block whitespace-nowrap pr-2 font-medium">
            ¡Chatea con nosotros!
          </span>
        </button>

        {/* Pulse animation */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75 -z-10"></div>
      </div>
    </div>
  );
};

export default WhatsAppFloat;
