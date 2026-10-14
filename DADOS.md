# Decisões de Arquitetura - Aula 06

1. **Tipo Vaga vs Model Vaga**: Optamos por manter o `type Vaga` separado do Prisma, definindo explicitamente as propriedades necessárias na camada de interface (tipos TypeScript), uma vez que o modelo do BD pode incluir campos adicionais como IDs de relação e senhas, mas eles são convergentes.
2. **Empresas Duplicadas (JSON vs BD)**: A empresa editada pelo site e salva no Banco de Dados vence a do JSON. Isso assegura que edições no perfil pela UI se reflitam instantaneamente.
3. **Candidaturas e Vagas Inexistentes**: Ao criar candidatura, validamos se a vaga existe.
4. **Arquivamento**: Arquivar não apaga a vaga do BD, apenas a marca com a flag `arquivada: true`. Isso preserva o histórico de candidaturas.
