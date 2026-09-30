import { PrismaClient } from "@prisma/client";

/**
 * Em desenvolvimento o Next recarrega o módulo a cada save. Sem guardar a
 * instância num lugar que sobrevive ao reload, cada save cria um cliente
 * novo — e os antigos ficam com a conexão aberta. Em poucos minutos o banco
 * recusa conexão, e a mensagem não fala nada sobre hot reload.
 *
 * Em produção não há reload, então a instância única basta.
 */
const global_ = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = global_.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global_.prisma = prisma;
