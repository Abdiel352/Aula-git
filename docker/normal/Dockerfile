# Usando a imagem base completa do Node (mais pesada)
FROM node:18

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando todo o código e as dependências (ERRO CLÁSSICO: NÃO USAR O CACHE DIREITO)
COPY . .

# Instalando dependências
RUN npm install

# Expondo a porta
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]
