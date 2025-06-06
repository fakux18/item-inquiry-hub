
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      if (credentials.email === 'admin@marketplace.com' && credentials.password === 'admin123') {
        onLogin();
      } else {
        alert('Credenciales inválidas. Prueba admin@marketplace.com / admin123');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-card p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-deep-blue rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-dark-charcoal">Acceso Administrativo</h1>
          <p className="text-mid-gray-blue mt-2">Accede a tu panel de control</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-deep-blue/5 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-deep-blue mb-2">Credenciales de Prueba:</h3>
          <p className="text-sm text-mid-gray-blue">Email: admin@marketplace.com</p>
          <p className="text-sm text-mid-gray-blue">Contraseña: admin123</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-dark-charcoal">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@marketplace.com"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="bg-white text-dark-charcoal placeholder-mid-gray-blue border-0 focus:ring-2 focus:ring-deep-blue"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-dark-charcoal">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="bg-white text-dark-charcoal placeholder-mid-gray-blue border-0 focus:ring-2 focus:ring-deep-blue"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={credentials.rememberMe}
                onCheckedChange={(checked) => 
                  setCredentials({ ...credentials, rememberMe: checked as boolean })
                }
              />
              <Label htmlFor="remember" className="text-sm text-dark-charcoal">Recordarme</Label>
            </div>
            <a href="#" className="text-sm text-deep-blue hover:text-terracotta transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-deep-blue hover:bg-deep-blue/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-mid-gray-blue hover:text-deep-blue transition-colors"
          >
            ← Volver al sitio web
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
