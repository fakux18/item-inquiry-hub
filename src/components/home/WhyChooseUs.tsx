import logoNavbar from "../../images/akinmobiliaria.webp"
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const WhyChooseUs = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Razones para elegirnos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">15+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Años de experiencia</h3>
              <p className="text-gray-600">Experiencia confiable en el mercado local</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Productos verificados</h3>
              <p className="text-gray-600">Cada producto es revisado personalmente</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">24h</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Atención Rápida</h3>
              <p className="text-gray-600">Atención personalizada a cada consulta</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <img
                src={logoNavbar}
                alt="Andres P - Dueño"
                className="w-24 h-24 rounded-full"
              />
              <div className="text-center md:text-left">
                <h4 className="text-xl font-semibold mb-2">Andrés P, Dueño</h4>
                <p className="text-gray-600 mb-4">
                  "Con más de 15 años en el mercado local, me aseguro personalmente de que cada anuncio cumpla con nuestros altos estándares. 
                  Tu satisfacción es mi garantía."
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <Button
                    onClick={() => window.open('https://wa.me/+5493755200964', '_blank')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    WhatsApp
                  </Button>
                  <Link to="/contact" className='!hover:bg-red-500 !hover:text-xl'>
                    <Button variant="border">
                      Enviar correo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
