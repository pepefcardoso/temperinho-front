import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidade | Leve Sabor',
    description: 'Entenda como coletamos, usamos e protegemos suas informações na plataforma Leve Sabor.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-warm-50">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-xl shadow-sm p-8 lg:p-12">
                    <h1 className="text-3xl lg:text-4xl font-display font-bold text-warm-900 mb-8">
                        Política de Privacidade
                    </h1>

                    <article className="prose prose-warm max-w-none">
                        <p className="text-warm-600 text-lg mb-8">
                            Última atualização: 2 de Julho de 2025
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">1. Informações que Coletamos</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Coletamos informações que você nos fornece diretamente, incluindo:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li>Nome e endereço de email quando você cria uma conta</li>
                                <li>Receitas, comentários e outros conteúdos que você publica</li>
                                <li>Informações de contato quando você nos envia mensagens</li>
                                <li>Preferências alimentares e restrições que você especifica</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">2. Informações Coletadas Automaticamente</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Quando você usa nossa plataforma, podemos coletar automaticamente:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li>Informações sobre seu dispositivo e navegador</li>
                                <li>Endereço IP e localização aproximada</li>
                                <li>Páginas visitadas e tempo gasto na plataforma</li>
                                <li>Cookies e tecnologias similares</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">3. Como Usamos suas Informações</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Utilizamos suas informações para:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li>Fornecer e melhorar nossos serviços</li>
                                <li>Personalizar sua experiência na plataforma</li>
                                <li>Enviar atualizações e newsletters (se solicitado)</li>
                                <li>Responder às suas perguntas e solicitações</li>
                                <li>Analisar o uso da plataforma para melhorias</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">4. Compartilhamento de Informações</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li>Com seu consentimento explícito</li>
                                <li>Para cumprir obrigações legais</li>
                                <li>Para proteger nossos direitos e segurança</li>
                                <li>Com prestadores de serviços que nos ajudam a operar a plataforma</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">5. Cookies</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Utilizamos cookies para melhorar sua experiência. Os cookies nos ajudam a:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li>Lembrar suas preferências e configurações</li>
                                <li>Analisar como você usa nossa plataforma</li>
                                <li>Personalizar conteúdo e anúncios</li>
                                <li>Manter você conectado à sua conta</li>
                            </ul>
                            <p className="text-warm-700 leading-relaxed mt-4">
                                Você pode controlar os cookies através das configurações do seu navegador.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">6. Segurança dos Dados</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Implementamos medidas técnicas e organizacionais apropriadas para proteger suas informações pessoais
                                contra acesso não autorizado, alteração, divulgação ou destruição.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">7. Seus Direitos</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Você tem o direito de:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li>Acessar suas informações pessoais</li>
                                <li>Corrigir informações imprecisas</li>
                                <li>Solicitar a exclusão de seus dados</li>
                                <li>Retirar seu consentimento a qualquer momento</li>
                                <li>Receber uma cópia de seus dados</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">8. Retenção de Dados</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos
                                nesta política, a menos que um período de retenção mais longo seja exigido por lei.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">9. Menores de Idade</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Nossa plataforma não é direcionada a menores de 13 anos. Não coletamos intencionalmente informações
                                pessoais de crianças menores de 13 anos.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">10. Alterações nesta Política</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações
                                significativas através da plataforma ou por email.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">11. Contato</h2>
                            <p className="text-warm-700 leading-relaxed">
                                Para questões sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais,
                                entre em contato conosco:
                            </p>
                            <div className="mt-4 p-4 bg-warm-50 rounded-lg">
                                <p className="text-warm-700">
                                    <strong>Email:</strong> privacidade@levesabor.com.br<br />
                                </p>
                            </div>
                        </section>
                    </article>
                </div>
            </main>
        </div>
    );
}