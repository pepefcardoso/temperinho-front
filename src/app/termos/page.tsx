import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Termos de Uso | Leve Sabor',
    description: 'Leia os nossos Termos de Uso para entender as regras e diretrizes da plataforma Leve Sabor.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-warm-50">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-xl shadow-sm p-8 lg:p-12">
                    <h1 className="text-3xl lg:text-4xl font-display font-bold text-warm-900 mb-8">
                        Termos de Uso
                    </h1>

                    <article className="prose prose-warm max-w-none">
                        <p className="text-warm-600 text-lg mb-8">
                            Última atualização: 2 de Julho de 2025
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">1. Aceitação dos Termos</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Ao acessar e usar o Leve Sabor, você concorda em cumprir e estar vinculado a estes Termos de Uso.
                                Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">2. Descrição do Serviço</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                O Leve Sabor é uma plataforma online que oferece receitas e conteúdo culinário voltado para
                                pessoas com restrições alimentares, incluindo dietas veganas, sem glúten, sem lactose, entre outras.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">3. Conta de Usuário</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Para acessar certas funcionalidades, você pode precisar criar uma conta. Você é responsável por:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li>Manter a confidencialidade da sua senha</li>
                                <li>Todas as atividades que ocorrem em sua conta</li>
                                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">4. Conteúdo do Usuário</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Ao enviar receitas, comentários ou outro conteúdo, você garante que:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li>Possui todos os direitos necessários sobre o conteúdo</li>
                                <li>O conteúdo não viola direitos de terceiros</li>
                                <li>O conteúdo não é ofensivo, ilegal ou prejudicial</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">5. Uso Proibido</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Você concorda em não usar a plataforma para:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li>Atividades ilegais ou não autorizadas</li>
                                <li>Enviar spam ou conteúdo malicioso</li>
                                <li>Interferir no funcionamento da plataforma</li>
                                <li>Copiar ou distribuir nosso conteúdo sem autorização</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">6. Propriedade Intelectual</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Todo o conteúdo da plataforma, incluindo textos, imagens, logos и design, é protegido por direitos autorais
                                e outras leis de propriedade intelectual.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">7. Limitação de Responsabilidade</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                O Leve Sabor não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais
                                resultantes do uso da plataforma. As receitas são fornecidas apenas para fins informativos.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">8. Modificações dos Termos</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações serão comunicadas
                                através da plataforma e entrarão em vigor imediatamente após a publicação.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">9. Contato</h2>
                            <p className="text-warm-700 leading-relaxed">
                                Para dúvidas sobre estes Termos de Uso, entre em contato conosco através da página de contato
                                ou pelo email: contato@levesabor.com.br
                            </p>
                        </section>
                    </article>
                </div>
            </main>
        </div>
    );
}