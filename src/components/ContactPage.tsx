import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockListings } from "../data/mockData";

const ContactPage = () => {
  const form = useRef();
  const SERVICE = "service_tzxj4bb";
  const TEMPLATE = "template_x7rn9qh";
  const KEY = "CNoUgEVNJ1bR3Msdg";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  
  const [isSending, setIsSending] = useState(false);
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const now = Date.now();
  const lastSend = localStorage.getItem("last_form_submit");

  if (lastSend && now - parseInt(lastSend) < 120000) {
    alert("Espera 2 minutos antes de enviar otra consulta.");
    return;
  }

  if (isSending) return;
  setIsSending(true);
  localStorage.setItem("last_form_submit", now.toString());

  alert("¡Gracias por tu consulta! Te responderemos en menos de 24 horas.");
  setFormData({ name: "", email: "", phone: "", interest: "", message: "" });

  emailjs.sendForm(SERVICE, TEMPLATE, form.current, KEY).then(
    (result) => {
      console.log(result.text);
    },
    (error) => {
      console.log(error.text);
    }
  ).finally(() => {
    setTimeout(() => setIsSending(false), 120000);
  });
};


  const handleWhatsAppContact = () => {

    const message = encodeURIComponent(
      "¡Hola! Estoy interesado en sus publicaciones y me gustaría saber más sobre lo que tienen disponible."
    );
    window.open(`https://wa.me/+5493775200964?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Contáctanos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Listo para encontrar tu propiedad o vehículo ideal? Estamos aquí
            para ayudarte con atención personalizada y asesoramiento experto.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            {/* Métodos de contacto */}
            <Card className="!border-none">
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* WhatsApp - Principal */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp (Recomendado)
                  </h3>
                  <p className="text-green-700 mb-4">
                    Respuestas instantáneas por WhatsApp. Disponible 24/7 para
                    consultas rápidas y sobre propiedades.
                  </p>
                  <Button
                    onClick={handleWhatsAppContact}
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Chatear ahora: (3775) 20-0964
                  </Button>
                </div>
                {/* Otros métodos */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Correo</h4>
                      <a
                        href="mailto:infoakmisiones@gmail.com"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        infoakmisiones@gmail.com
                      </a>
                      <p className="text-sm text-gray-500">
                        Respuesta en menos de 24 horas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Teléfono</h4>
                      <a
                        href="https://wa.me/+5493775200964"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        (3775) 20-0964
                      </a>
                      <p className="text-sm text-gray-500">
                        Solo en horario laboral
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Oficina</h4>
                      <p className="text-gray-600">
                        Calle del Lapacho 456
                        <br />
                        Posadas, N3300
                      </p>
                      <p className="text-sm text-gray-500">
                        Solo con cita previa
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Horarios */}
            <Card className="!border-none">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lunes a Viernes</span>
                    <span className="font-medium">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sábado</span>
                    <span className="font-medium">9:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domingo</span>
                    <span className="font-medium">Con cita previa</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-green-600 font-medium">
                    Soporte WhatsApp disponible 24/7
                  </p>
                </div>
              </CardContent>
            </Card>
            {/* Sobre el agente */}
            <Card className="!border-none">
              <CardHeader>
                <CardTitle>Conoce a tu agente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src="/placeholder.svg"
                    alt="John Smith"
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Andrés Perin
                    </h3>
                    <p className="text-gray-600">
                      Propietario y agente matriculado
                    </p>
                    <p className="text-sm text-gray-500">
                      Más de 15 años de experiencia
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  "Personalmente atiendo cada consulta con dedicación y brindo
                  un servicio honesto y transparente. Mi objetivo es ayudarte a
                  encontrar exactamente lo que buscas al mejor precio."
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Especialidades:</span>
                    <span className="text-gray-800">
                      Propiedades y Vehículos
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Idiomas:</span>
                    <span className="text-gray-800">Español, Inglés</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Formulario de contacto */}
          <div>
            <Card className="bg-white shadow-xl !border-none">
              <CardHeader>
                <CardTitle>Envíanos un mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} ref={form} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre *</Label>
                      <Input
                        name="name"
                        id="name"
                        placeholder="Tu nombre"
                        className="border border-dark-charcoal invalid:border-red-400 valid:border-green-400"
                        value={formData.name}
                        maxLength={50}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo *</Label>
                      <Input
                        name="email"
                        id="email"
                        type="email"
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
                        placeholder="Tu correo electrónico"
                        value={formData.email}
                        className="border border-dark-charcoal invalid:border-red-400 valid:border-green-400"
                        onChange={(e) => 
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      name="phone"
                      id="phone"
                      type="text"
                      placeholder="Ej: 37571234567"
                      pattern="^([1-9]{2,4})([0-9]{6,8})$"
                      minLength={8}
                      maxLength={12}
                      value={formData.phone}
                      className="border border-dark-charcoal"
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interest">Estoy interesado en</Label>
                    <Select
                      value={formData.interest}
                      onValueChange={(value) =>
                        setFormData({ ...formData, interest: value })
                      }
                    >
                      <SelectTrigger className="border border-dark-charcoal">
                        <SelectValue placeholder="Selecciona lo que te interesa" />
                      </SelectTrigger>
                      <SelectContent className="!border-none">
                        <SelectItem value="general">
                          Consulta general
                        </SelectItem>
                        {mockListings.map((listing) => (
                          <SelectItem key={listing.id} value={listing.title}>
                            {listing.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {/* ESTA MAMADA ES LO QUE PERMITE ENVIAR A EMAILJS EL NOMBRE DEL PRODUCTO DE INTERES */}
                    <input type="hidden" id="interest" name="interest" value={formData.interest} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      name="message"
                      id="message"
                      rows={5}
                      placeholder="¿Qué te gustaría saber?"
                      value={formData.message}
                      className="border border-dark-charcoal"
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    onSubmit={handleSubmit}
                    className={isSending 
                      ? "w-full bg-blue-600 hover:bg-blue-700 text-white pointer-events-none" 
                      : "w-full bg-blue-600 hover:bg-blue-700 text-white"}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar mensaje
                  </Button>
                </form>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Al enviar este formulario, aceptas nuestra política de
                    privacidad. Nunca compartiremos tu información con terceros.
                  </p>
                  <p className="text-sm text-gray-600 font-medium mt-2">
                    Normalmente respondemos todas las consultas en menos de 24
                    horas.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
