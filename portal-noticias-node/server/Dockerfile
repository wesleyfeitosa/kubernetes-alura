# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copia arquivos de dependência e instala
COPY package*.json ./
COPY prisma ./prisma
RUN npm install

# Copia o restante do código
COPY . .

# Compila o projeto NestJS
RUN npm run build

# Etapa 2: Execução
FROM node:20-alpine

WORKDIR /app

# Copia node_modules e build da etapa anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Instala apenas dependências de produção
RUN npm ci --omit=dev

# Define variáveis de ambiente (opcional)
ENV NODE_ENV=production

# Porta exposta (ajuste conforme sua API)
EXPOSE 3000

# Comando para iniciar a API NestJS
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]
