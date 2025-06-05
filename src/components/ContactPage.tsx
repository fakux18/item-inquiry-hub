import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockListings } from '../data/mockData';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd submit this to your backend
    console.log('Contact form submitted:', formData);
    alert('Thank you for your inquiry! We will respond within 24 hours.');
    setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in your listings and would like to know more about what you have available."
    );
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to find your perfect property or vehicle? We're here to help with personalized service and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* WhatsApp - Primary */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp (Recommended)
                  </h3>
                  <p className="text-green-700 mb-4">
                    Get instant responses via WhatsApp. Available 24/7 for quick questions and property inquiries.
                  </p>
                  <Button
                    onClick={handleWhatsAppContact}
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Chat Now: (555) 123-4567
                  </Button>
                </div>

                {/* Other Contact Methods */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <a href="mailto:info@marketplace.com" className="text-blue-600 hover:text-blue-700">
                        info@marketplace.com
                      </a>
                      <p className="text-sm text-gray-500">Response within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <a href="tel:+1234567890" className="text-blue-600 hover:text-blue-700">
                        (555) 123-4567
                      </a>
                      <p className="text-sm text-gray-500">Business hours only</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Office Location</h4>
                      <p className="text-gray-600">
                        123 Market Street<br />
                        Springfield, ST 12345
                      </p>
                      <p className="text-sm text-gray-500">By appointment only</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">By appointment</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-green-600 font-medium">
                    WhatsApp support available 24/7
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* About Agent */}
            <Card>
              <CardHeader>
                <CardTitle>Meet Your Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src="/placeholder.svg"
                    alt="John Smith"
                    className="w-20 h-20 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">John Smith</h3>
                    <p className="text-gray-600">Owner & Licensed Agent</p>
                    <p className="text-sm text-gray-500">15+ Years Experience</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  "I personally handle every inquiry with care and provide honest, transparent service. 
                  My goal is to help you find exactly what you're looking for at the right price."
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Specialties:</span>
                    <span className="text-gray-800">Properties & Vehicles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Languages:</span>
                    <span className="text-gray-800">English, Spanish</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest">I'm interested in</Label>
                    <Select
                      value={formData.interest}
                      onValueChange={(value) => setFormData({ ...formData, interest: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select what you're interested in" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        {mockListings.map(listing => (
                          <SelectItem key={listing.id} value={listing.id}>
                            {listing.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      placeholder="What would you like to know?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    By submitting this form, you agree to our privacy policy. We'll never share your 
                    information with third parties.
                  </p>
                  <p className="text-sm text-gray-600 font-medium mt-2">
                    We typically respond to all inquiries within 24 hours.
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
