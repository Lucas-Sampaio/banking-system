FROM node:23.10.0

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências
RUN npm install

# Copia o restante da aplicação
COPY . .

# Build da aplicação (caso use TypeScript)
RUN npm run build

# Expondo a porta da aplicação (ajuste conforme necessário)
EXPOSE 3000

# Comando de inicialização padrão
CMD ["npm", "run", "start:prod"]
