# Usando uma imagem base slim (mais leve)
FROM node:18-alpine

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando APENAS o package.json e package-lock.json primeiro (USO OTIMIZADO DO CACHE)
COPY package*.json ./

# Instalando dependências (esta camada será cacheada se o package.json não mudar)
RUN npm install --production

# Copiando o resto do código da aplicação
COPY . .

# Expondo a porta
EXPOSE 3000

# Adicionando um usuário não-root por segurança (boa prática)
USER node

# Comando para iniciar
CMD ["npm", "start"]
