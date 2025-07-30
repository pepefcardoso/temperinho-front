import type { Metadata } from 'next';
import { formatDate, LAST_UPDATE_DATE } from '@/lib/dateUtils';

export const metadata: Metadata = {
    title: 'Política de Privacidade | Temperinho',
    description: 'Entenda como coletamos, usamos e protegemos suas informações na plataforma Temperinho.',
};

export default function PrivacyPage() {
    const lastUpdated = formatDate(LAST_UPDATE_DATE, "d 'de' MMMM 'de' yyyy");

    return (
        <div className="min-h-screen bg-warm-50">
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-xl shadow-sm p-8 lg:p-12">
                    <h1 className="text-3xl lg:text-4xl font-display font-bold text-warm-900 mb-8">
                        Política de Privacidade
                    </h1>

                    <article className="prose prose-warm max-w-none">
                        <p className="text-warm-600 text-lg mb-8">
                            Última atualização: {lastUpdated}
                        </p>

                        <p className="text-warm-700 leading-relaxed mb-8">
                            Bem-vindo(a) ao Temperinho! A sua privacidade é de extrema importância para nós. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">1. Informações que Coletamos</h2>
                            <p className="text-warm-700 leading-relaxed mb-2"><strong>a) Informações Fornecidas por Você:</strong></p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2 mb-4">
                                <li><strong>Dados Cadastrais:</strong> Nome e email ao criar uma conta.</li>
                                <li><strong>Conteúdo Gerado pelo Usuário:</strong> Receitas, comentários, fotos e outras informações que você publica.</li>
                                <li><strong>Dados Pessoais Sensíveis:</strong> Preferências e restrições alimentares (como alergias, intolerâncias, dietas específicas) que você voluntariamente especifica em seu perfil. Tratamos esses dados com o máximo rigor, conforme detalhado na Seção 3.</li>
                                <li><strong>Informações de Contato:</strong> Dados fornecidos ao nos contatar para suporte ou outras dúvidas.</li>
                            </ul>
                            <p className="text-warm-700 leading-relaxed mb-2"><strong>b) Informações Coletadas Automaticamente:</strong></p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li><strong>Dados de Acesso:</strong> Endereço IP, tipo de navegador, sistema operacional, data e hora do acesso.</li>
                                <li><strong>Dados de Uso:</strong> Páginas visitadas, tempo de permanência, cliques e interações com a plataforma.</li>
                                <li><strong>Cookies e Tecnologias Similares:</strong> Para análise, personalização e publicidade, conforme detalhado na Seção 5.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">2. Finalidade e Base Legal para o Tratamento</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Tratamos seus dados pessoais com base nas seguintes hipóteses legais da LGPD:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-3">
                                <li><strong>Para executar o contrato de serviço (Art. 7º, V):</strong> Usamos seus dados para criar e gerenciar sua conta, publicar seu conteúdo, personalizar sua experiência e viabilizar o funcionamento da plataforma.</li>
                                <li><strong>Com base no seu consentimento (Art. 7º, I):</strong> Para enviar newsletters, promoções e comunicações de marketing, e para o tratamento de dados sensíveis, conforme Seção 3. Você pode retirar seu consentimento a qualquer momento.</li>
                                <li><strong>Para atender ao nosso legítimo interesse (Art. 7º, IX):</strong> Para analisar o uso da plataforma para melhorias, realizar pesquisas, desenvolver novos recursos e prevenir fraudes, sempre balanceando com os seus direitos e liberdades.</li>
                                <li><strong>Para cumprir obrigações legais ou regulatórias (Art. 7º, II):</strong> Para atender a determinações judiciais ou de autoridades competentes.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">3. Tratamento de Dados Pessoais Sensíveis</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Reconhecemos que informações sobre restrições alimentares são dados de saúde e, portanto, <strong>dados pessoais sensíveis</strong>. O tratamento desses dados é realizado com base no seu <strong>consentimento explícito e destacado (Art. 11, I, da LGPD)</strong>, fornecido no momento em que você adiciona essas informações ao seu perfil. A finalidade é exclusivamente personalizar as receitas e a sua experiência na plataforma. Você pode alterar ou remover essas informações a qualquer momento através das configurações do seu perfil.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">4. Compartilhamento de Informações</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Não vendemos ou alugamos seus dados. Podemos compartilhá-los com parceiros e prestadores de serviços (operadores), que são essenciais para o nosso funcionamento. O compartilhamento ocorre com:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li><strong>Prestadores de Serviços (Operadores):</strong> Empresas que nos fornecem serviços de infraestrutura em nuvem (hospedagem), análise de dados, ferramentas de comunicação e marketing. Exigimos que todos os operadores cumpram com as obrigações da LGPD através de contratos de tratamento de dados (DPAs).</li>
                                <li><strong>Autoridades Legais:</strong> Mediante ordem judicial ou obrigação legal.</li>
                                <li><strong>Terceiros em Transações Societárias:</strong> Em caso de fusão, aquisição ou venda de ativos da empresa, seus dados poderão ser transferidos ao novo controlador, que ficará vinculado a esta Política.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">5. Cookies e Tecnologias de Terceiros</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Ao visitar nosso site pela primeira vez, você será informado sobre o uso de cookies através de um banner. Você terá a opção de aceitar todos, recusar cookies não essenciais (como de marketing e análise) ou gerenciar suas preferências.
                            </p>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Nossos principais parceiros que podem coletar dados através de cookies incluem:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li><strong>Google Analytics:</strong> para entender como os usuários interagem com o site.</li>
                                <li><strong>Google AdSense:</strong> para veicular anúncios personalizados.</li>
                            </ul>
                            <p className="text-warm-700 leading-relaxed mt-4">
                                Você pode alterar suas preferências a qualquer momento através do link de gerenciamento de cookies em nosso rodapé ou nas configurações do seu navegador.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">6. Seus Direitos como Titular dos Dados</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Conforme a LGPD, você tem o direito de solicitar a qualquer momento:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2 mb-4">
                                <li>A confirmação da existência de tratamento;</li>
                                <li>O acesso aos seus dados;</li>
                                <li>A correção de dados incompletos, inexatos ou desatualizados;</li>
                                <li>A anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                                <li>A portabilidade dos seus dados a outro fornecedor;</li>
                                <li>A eliminação dos dados tratados com seu consentimento;</li>
                                <li>Informações sobre o compartilhamento de seus dados;</li>
                                <li>A revogação do consentimento.</li>
                            </ul>
                            <p className="text-warm-700 leading-relaxed">
                                Para exercer qualquer um desses direitos, entre em contato com nosso DPO pelo e-mail indicado na Seção 11. Responderemos às solicitações em um prazo razoável, buscando atender à sua requisição em até 15 dias, conforme os prazos da legislação.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">7. Segurança e Retenção de Dados</h2>
                            <p className="text-warm-700 leading-relaxed mb-2"><strong>a) Medidas de Segurança:</strong></p>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Implementamos medidas técnicas e organizacionais rigorosas para proteger seus dados, incluindo criptografia de dados em trânsito (SSL/TLS) e em repouso, controles de acesso restritos baseados em função e monitoramento contínuo para detectar e responder a ameaças.
                            </p>
                            <p className="text-warm-700 leading-relaxed mb-2"><strong>b) Retenção de Dados:</strong></p>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Reteremos suas informações apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletadas, ou para cumprir obrigações legais, fiscais e de auditoria. Os critérios são:
                            </p>
                            <ul className="list-disc pl-6 text-warm-700 space-y-2">
                                <li><strong>Dados da conta:</strong> Mantidos enquanto sua conta estiver ativa. Após o encerramento, serão mantidos por até 2 anos para cumprir obrigações legais.</li>
                                <li><strong>Dados de uso e navegação:</strong> Mantidos de forma agregada e anonimizada por períodos mais longos para análise, ou de forma identificável por até 6 meses.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">8. Transferência Internacional de Dados</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Alguns dos nossos prestadores de serviços (como provedores de nuvem) podem estar localizados fora do Brasil. Nesses casos, garantimos que essa transferência ocorra apenas para países que proporcionem um grau de proteção de dados adequado ou mediante o uso de mecanismos de transferência aprovados pela ANPD, como as Cláusulas-Padrão Contratuais, assegurando a conformidade com a LGPD.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">9. Menores de Idade</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Nossa plataforma não é direcionada a crianças (menores de 12 anos). Não coletamos intencionalmente dados de crianças. Se identificarmos que isso ocorreu sem o consentimento específico e em destaque de um dos pais ou responsável legal, procederemos com a exclusão desses dados. O uso da plataforma por adolescentes (entre 12 e 18 anos) deve ser supervisionado pelos pais ou responsáveis.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">10. Alterações nesta Política</h2>
                            <p className="text-warm-700 leading-relaxed mb-4">
                                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações significativas através da plataforma, por email ou outro canal de contato direto. Recomendamos que você revise esta página regularmente.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-warm-800 mb-4">11. Encarregado pelo Tratamento de Dados (DPO)</h2>
                            <p className="text-warm-700 leading-relaxed">
                                Para exercer seus direitos ou para qualquer dúvida sobre o tratamento de seus dados pessoais, entre em contato com nosso Encarregado de Dados (DPO):
                            </p>
                            <div className="mt-4 p-4 bg-warm-50 rounded-lg">
                                <p className="text-warm-700">
                                    <strong>Nome do Encarregado:</strong> Pedro Paulo Fernandes Cardoso<br />
                                    <strong>Email para contato:</strong> contato@temperinho.com.br
                                </p>
                            </div>
                        </section>
                    </article>
                </div>
            </main>
        </div>
    );
}