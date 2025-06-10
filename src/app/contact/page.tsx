"use client" // Marca este como um Componente de Cliente devido à interatividade do formulário

import * as React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Metadata } from 'next';

// Componentes
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Embora "use client" impeça a exportação de metadados daqui,
// é uma boa prática mantê-los em um arquivo de layout ou na própria página se ela fosse um Server Component.
// Para App Router, você pode definir isso no layout.ts pai.
/*
export const metadata: Metadata = {
  title: 'Contato | Culinária Inclusiva',
  description: 'Tire suas dúvidas, envie sugestões ou compartilhe sua experiência conosco.',
};
*/

const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      description: 'contato@culinariainclusiva.com.br',
      details: 'Respondemos em até 24 horas'
    },
    {
      icon: Phone,
      title: 'Telefone',
      description: '(11) 1234-5678',
      details: 'Segunda a sexta, 9h às 18h'
    },
    {
      icon: MapPin,
      title: 'Endereço',
      description: 'São Paulo, SP',
      details: 'Atendimento virtual'
    },
    {
      icon: Clock,
      title: 'Horário de Atendimento',
      description: 'Segunda a sexta: 9h às 18h',
      details: 'Sábados: 9h às 14h'
    }
];

const ContactPage = () => {
  // Estado para controlar os campos do formulário
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState('');

  // Função para atualizar o estado quando o usuário digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  // Função para o componente Select
  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Aqui você faria a chamada para sua API de backend
    console.log("Dados do formulário a serem enviados:", formData);
    
    // Simulação de chamada de API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitMessage('Mensagem enviada com sucesso! Agradecemos o contato.');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Limpa o formulário
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-warm-50 to-sage-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-warm-600 max-w-3xl mx-auto leading-relaxed">
              Tem uma dúvida, sugestão ou quer compartilhar sua experiência? 
              Estamos aqui para ouvir você e ajudar no que precisar.
            </p>
          </div>
        </section>

        {/* Top Banner */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AdBanner size="large" position="top" />
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-semibold text-warm-900 mb-6">
                  Envie sua Mensagem
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" type="text" placeholder="Seu nome completo" className="mt-1" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" className="mt-1" value={formData.email} onChange={handleInputChange} required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Assunto</Label>
                    <Select onValueChange={handleSubjectChange} value={formData.subject} required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione o assunto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="receita">Dúvida sobre receita</SelectItem>
                        <SelectItem value="sugestao">Sugestão de conteúdo</SelectItem>
                        <SelectItem value="parceria">Proposta de parceria</SelectItem>
                        <SelectItem value="feedback">Feedback do site</SelectItem>
                        <SelectItem value="outro">Outro assunto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Conte-nos como podemos ajudar..."
                      className="mt-1 min-h-32"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700" disabled={isSubmitting}>
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                  
                  {submitMessage && <p className="text-sm text-green-600 mt-4">{submitMessage}</p>}
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-warm-900 mb-6">
                    Informações de Contato
                  </h2>
                  <p className="text-warm-600 mb-8">
                    Escolha a forma de contato que preferir. Estamos sempre prontos 
                    para ajudar você na sua jornada pela culinária inclusiva.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-warm-50 rounded-lg">
                      <div className="flex-shrink-0 w-10 h-10 bg-sage-100 rounded-lg flex items-center justify-center">
                        <info.icon className="h-5 w-5 text-sage-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-warm-900 mb-1">{info.title}</h3>
                        <p className="text-warm-800 mb-1">{info.description}</p>
                        <p className="text-sm text-warm-600">{info.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FAQ */}
                <div className="bg-sage-50 rounded-xl p-6">
                  <h3 className="font-semibold text-warm-900 mb-4">FAQ Rápido</h3>
                  <div className="space-y-4 text-sm">
                    {/* ...FAQ items... */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Middle & Newsletter Sections */}
        {/* ...demais seções... */}

      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;