# Plano de Aula & Guia Completo: Docker
## Da Síndrome do "Na Minha Máquina Funciona" à Criação de Imagens Otimizadas

### Módulo 1: O Problema - A Matriz do Inferno
Inicie a aula desenhando um cenário clássico de desenvolvimento corporativo. Imagine uma plataforma de dados já em operação, construída com uma API e um banco de dados relacional. No computador do desenvolvedor, tudo roda perfeitamente pois as versões corretas das linguagens, bibliotecas e serviços já estão configuradas.
O problema surge ao tentar colocar essa aplicação em produção num servidor VPS. Lá, o sistema operacional é outro, outras aplicações rodam na mesma máquina e as versões conflitam. O ato de configurar servidores virava um trabalho artesanal e propenso a erros catastróficos.

#### A Solução Antiga: Máquinas Virtuais (VMs)
A primeira tentativa da indústria de resolver isso foi virtualizar o hardware. Criava-se uma VM para cada aplicação. O gargalo? Cada VM precisava de um Sistema Operacional Convidado (Guest OS) completo. Isso consumia gigabytes de RAM e armazenamento apenas para manter o SO em pé, antes mesmo de rodar a aplicação desejada.

---

### Módulo 2: O que é o Docker? A Revolução dos Contêineres
O Docker, popularizado em 2013, não virtualiza o hardware, mas sim o Sistema Operacional. Ele utiliza recursos intrínsecos do núcleo do Linux (como namespaces para isolamento e cgroups para limite de recursos) para empacotar uma aplicação e todas as suas dependências em uma unidade padronizada: o **Contêiner**.

> **Analogia Visual: O Navio Cargueiro**
> Antes dos contêineres físicos existirem nos portos, transportar mercadorias (carros, pianos, sacas de café) era um caos, pois cada item exigia um manuseio e um espaço diferente no navio. O contêiner de aço padronizou o transporte: não importa o que tem dentro, o guindaste sabe como pegar e o navio sabe como empilhar. O Docker faz exatamente isso com o software.

---

### Módulo 3: Conceitos Fundamentais (O Dicionário)
Para manipular o Docker com confiança, a turma precisa internalizar os termos abaixo:
* **Imagem (Image):** É um pacote imutável, apenas de leitura. É a planta arquitetônica da aplicação. Contém o código, bibliotecas, variáveis de ambiente e arquivos de configuração.
* **Contêiner (Container):** É a instância viva e em execução de uma imagem. Se a imagem é a receita do bolo, o contêiner é o bolo assado em cima da mesa.
* **Dockerfile:** Um arquivo de texto simples contendo a lista de instruções de como a imagem deve ser construída passo a passo.
* **Docker Hub / Registry:** O repositório global na nuvem onde as imagens são armazenadas e compartilhadas (análogo ao GitHub, mas para imagens Docker).
* **Volumes:** O mecanismo de persistência de dados. Contêineres são efêmeros (se forem deletados, tudo que foi gravado neles some). Volumes são "HDs externos" mapeados do host para dentro do contêiner, garantindo que bancos de dados não evaporem.

---

### Módulo 4: Mão na Massa - O Ciclo de Vida
Demonstração prática no terminal dos comandos operacionais diários:

| Comando | O que faz? |
| :--- | :--- |
| `docker pull <imagem>` | Baixa a imagem do Docker Hub para a máquina local sem executá-la. |
| `docker run -d -p 8080:80 <imagem>` | Cria e inicia um contêiner. `-d` roda em segundo plano (detached), `-p` mapeia a porta 8080 do PC para a 80 do contêiner. |
| `docker ps` / `docker ps -a` | Lista os contêineres atualmente em execução. O `-a` lista também os parados. |
| `docker stop <id>` | Desliga o contêiner de forma graciosa. |
| `docker rm <id>` | Remove o contêiner (ele precisa estar parado). |
| `docker logs -f <id>` | Exibe a saída do terminal do contêiner em tempo real (essencial para debug). |

---

### Módulo 5: Construindo as Próprias Imagens (Dockerfile)
O poder real do Docker surge quando o desenvolvedor empacota sua própria aplicação.

Comando de Build: `docker build -t minha-aplicacao:v1 .`

---

### Módulo 6: Nível Avançado - Otimização de Imagens
Muitos iniciantes criam imagens de 1GB para uma aplicação que tem apenas 10MB de código. Ensine estas boas práticas vitais para economizar banda e armazenamento em servidores VPS:

#### 1. O Sistema de Camadas (Layers) e Uso do Cache
Cada instrução `RUN`, `COPY` e `ADD` no Dockerfile cria uma nova "camada" imutável. O Docker usa um sistema de cache inteligente: se uma camada não mudou, ele reaproveita a anterior.
**O Erro Clássico:** Copiar o código fonte junto com as dependências na mesma etapa.
**A Correção (Otimização):** Copie apenas os arquivos de configuração de dependências primeiro, instale-as, e só depois copie o código da aplicação. Como o código muda toda hora, mas as bibliotecas não, isso acelera o tempo de build em até 90%!

#### 2. Multi-stage Builds (Construção em Múltiplas Etapas)
Para linguagens compiladas (como Java, Go, C#), você precisa de compiladores pesados para gerar o artefato. No entanto, para rodar a aplicação em produção, você só precisa do ambiente de execução (Runtime). O Multi-stage build permite usar múltiplas diretivas `FROM` no mesmo arquivo.

#### 3. Imagens Base Minimalistas
Recomende fugir da imagem genérica `ubuntu` ou imagens completas. Ensine o uso de variações otimizadas para segurança e tamanho:
* **Alpine:** Uma distribuição Linux focada em segurança que pesa apenas ~5MB. Ex: `python:3.10-alpine`.
* **Slim:** Versões com pacotes reduzidos das distribuições padrão. Ex: `node:18-slim`.

---

**Consulte os exemplos práticos nas pastas `normal/` e `optimized/` para ver a diferença estrutural em uma aplicação real com acesso a banco de dados!**
