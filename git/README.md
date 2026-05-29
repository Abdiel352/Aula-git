# Plano de Aula & Guia Completo: Git e GitHub
## Do Entendimento Filosófico aos Padrões e Comandos Avançados da Indústria

### Módulo 1: O Problema e a Filosofia (A Dor Antes da Cura)

O maior erro ao ensinar sistemas de controle de versão é apresentar os comandos sem contextualizar o caos que a ausência deles provoca. Este módulo fixa os fundamentos conceituais essenciais.

#### A Tragédia do Versionamento Manualv sdf sdf sdf 
Todo desenvolvedor iniciante ou equipe sem ferramentas adequadas recorre empiricamente à duplicação de diretórios. O instrutor deve ilustrar o cenário clássico de uma pasta de projeto evoluindo para:
* `projeto_base/`
* `projeto_final/`
* `projeto_final_v2/`
* `projeto_final_AGORA_VAI_FINAL/`

**Impactos colaterais desse método:** Desperdício severo de armazenamento local, total impossibilidade de rastrear quais linhas de código mudaram entre as versões, perda crônica de histórico e o inevitável problema de sobrescrita quando múltiplos desenvolvedores tentam consolidar alterações compartilhando arquivos compactados (`.zip`).

#### O que é um Sistema de Controle de Versão Distribuído (DVCS)?
Defina o Git como uma estrutura matemática descentralizada de registro temporal para arquivos de texto. Ao contrário de ferramentas legadas de versionamento centralizado (como SVN), onde o histórico completo reside em um único servidor, o Git opera de forma distribuída. Isso significa que cada máquina local que clona um projeto possui um espelhamento idêntico e completo de todo o banco de dados histórico, ramificações e metadados, garantindo redundância total e capacidade de operação 100% offline.

#### A Distinção Fundamental: Git vs. GitHub
A confusão sistemática entre as duas ferramentas deve ser sanada imediatamente:
* **Git:** O motor interno. Um software de código aberto executado puramente na linha de comando local do computador do desenvolvedor. Gerencia o histórico de modificações locais sem depender de conexões externas.
* **GitHub:** O ecossistema externo. Uma plataforma de hospedagem baseada na nuvem que armazena repositórios Git remotos, adicionando uma interface gráfica amigável, ferramentas de gerenciamento de equipes, esteiras de automação (CI/CD) e mecanismos de revisão de código, como os Pull Requests.

> **Analogia de Fixação:**
> O Git funciona exatamente como o protocolo ou a tecnologia do E-mail. O GitHub é o provedor do serviço com interface visual rica, análogo ao que o Gmail representa para o ecossistema de e-mails.

---

### Módulo 2: A Anatomia do Git - A Regra dos Três Estados

Para mitigar o vício comum de executar sequências automatizadas de comandos sem discernimento, os alunos devem dominar a tripartição lógica onde o Git categoriza e manipula os arquivos.

#### Os Três Pilares Locais do Ciclo de Vida:
1. **Working Directory (Diretório de Trabalho / Oficina):** O estado bruto dos arquivos na sua máquina. Qualquer criação, deleção ou modificação de linha ocorre aqui. O Git acompanha essas mudanças de forma passiva, rotulando os arquivos como Modified (Modificado) ou Untracked (Não rastreado, para arquivos novos).
2. **Staging Area / Index (Área de Preparação / Palco):** Um arquivo de indexação oculto que funciona como uma zona de curadoria ou pré-produção. É o diferencial arquitetural do Git. Permite ao desenvolvedor agrupar modificações cirúrgicas e granulares que devem compor o próximo registro definitivo, ignorando o resto da bagunça temporária da oficina. Arquivos aqui são classificados como Staged.
3. **Local Repository (Repositório Local / Cofre):** O banco de dados definitivo do Git (armazenado estritamente na pasta oculta `.git/`). Quando os dados entram neste estado, eles recebem um hash SHA-1/SHA-256 exclusivo e permanente, consolidando-se como uma versão imutável da linha do tempo. Arquivos aqui são classificados como Committed.

> **Analogia da Foto de Família:**
> Imagine organizar um retrato oficial: O Working Directory é o quintal da casa, onde todos os parentes estão dispersos, correndo com roupas casuais. A Staging Area é o sofá da sala onde você posiciona estrategicamente apenas as pessoas escolhidas, devidamente alinhadas e arrumadas para a foto. O Local Repository é o disparo definitivo do flash da câmera: a foto é registrada, impressa e catalogada no álbum imutável de memórias.

---

### Módulo 3: Configuração Inicial e Autenticação por Chaves SSH

A configuração inicial do ambiente estabelece a identidade do desenvolvedor no grafo de commits e remove as barreiras de segurança modernas impostas pelas plataformas de nuvem.

#### Configurações Globais de Identidade
Antes do primeiro commit, o Git exige a identificação do autor, essencial para a auditoria de autoria do código:
```bash
git config --global user.name "Seu Nome Completo"
git config --global user.email "seu-email-registrado@github.com"
```

#### Autenticação Moderna com Chaves SSH
Desde a desativação da autenticação por senhas simples via terminal no GitHub, o uso de chaves criptográficas assimétricas baseadas no protocolo SSH (Secure Shell) tornou-se o padrão obrigatório da indústria. Esse modelo elimina a necessidade de digitação contínua de credenciais através de um canal seguro.

O conceito apoia-se em duas chaves complementares:
* **Chave Pública (Cadeado):** Fica armazenada no servidor do GitHub. Pode ser exposta publicamente.
* **Chave Privada (Chave Física):** Mantida sob sigilo absoluto na máquina local (diretório `~/.ssh/`). Nunca deve ser compartilhada.

#### Fluxo Técnico de Implementação em Aula:
1. **Geração da chave utilizando o algoritmo moderno e seguro Ed25519:**
   ```bash
   ssh-keygen -t ed25519 -C "seu-email@exemplo.com"
   ```
2. **Inicialização do agente de autenticação local e adição da chave gerada:**
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```
3. **Exibição e cópia da chave pública para cadastro no painel do GitHub (Settings > SSH and GPG Keys):**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
4. **Validação estrutural da conectividade direta com os servidores remotos:**
   ```bash
   ssh -T git@github.com
   ```

> **Dica Prática para Estudantes:**
> Durante a etapa de navegação no painel de configurações do GitHub para inclusão das chaves SSH, recomende fortemente que os alunos realizem a solicitação do GitHub Student Developer Pack. Esse benefício educacional concede acesso gratuito a licenças de IDEs profissionais (como IntelliJ IDEA Ultimate) e créditos em nuvem, ferramentas cruciais para o desenvolvimento de projetos acadêmicos e profissionais.

---

### Módulo 4: O Fluxo de Trabalho Diário (Comandos Principais)

Passo a passo prático para guiar a turma na manipulação do ciclo local de arquivos.

* `git init`: Inicializa um repositório Git vazio, criando a pasta oculta de gerenciamento interno `.git/` no diretório atual.
* `git status`: O comando indispensável de auditoria. Exibe o estado atual dos arquivos nas três áreas de processamento (arquivos modificados, preparados ou não rastreados). Deve ser executado continuamente.
* `git add <arquivo>`: Move modificações específicas do Working Directory para a Staging Area. O comando genérico `git add .` adiciona todas as mudanças recursivamente a partir do diretório atual.
* `git commit -m "Mensagem Semântica"`: Captura permanentemente o instantâneo indexado na Staging Area, criando um nó na árvore histórica local acompanhado de uma justificativa descritiva.
* `git log`: Lista cronologicamente em ordem reversa todos os commits realizados no repositório, detalhando o Hash identificador, o autor, a data e a mensagem associada. Use `git log --oneline` para uma leitura compacta.

---

### Módulo 5: Universos Paralelos (Gerenciamento de Branches)

Ramificações isolam fluxos de desenvolvimento, permitindo que novas funcionalidades ou correções coexistam sem corromper a estabilidade da linha principal do software (`main` ou `master`).

#### Comandos Modernos de Ramificação:
* `git branch <nome-da-branch>`: Cria um novo ponteiro apontando para o commit atual da linha do tempo.
* `git switch <nome-da-branch>`: Comando moderno focado exclusivamente na transição entre ramos de trabalho (substitui pedagogicamente o uso ambíguo do antigo comando `git checkout`).
* `git merge <nome-da-branch>`: Combina o histórico do ramo especificado para dentro da branch em que o usuário está posicionado atualmente.

---

### Módulo 6: O Mundo Exterior e Colaboração Remota

Tratativa da integração entre o repositório local da máquina do desenvolvedor e o ecossistema hospedado na nuvem.

* `git clone <url-ssh>`: Baixa um repositório remoto existente no GitHub, configurando automaticamente os mapeamentos de sincronização locais.
* `git remote add origin <url-ssh>`: Vincula um repositório local criado do zero a um endereço remoto alvo pela primeira vez.
* `git push -u origin <nome-da-branch>`: Envia os commits locais consolidados para a nuvem. O parâmetro `-u` (upstream) vincula de forma definitiva as ramificações locais e remotas para comandos futuros diretos.
* `git pull`: Executa a busca (fetch) de modificações remotas inseridas por outros colaboradores e realiza automaticamente a fusão (merge) na branch local ativa.

#### Governança com o arquivo `.gitignore`
Ensine rigorosamente o uso do arquivo especial `.gitignore` colocado na raiz do projeto. É fundamental que os alunos entendam que arquivos binários pesados, dependências baixadas por gerenciadores de pacotes (ex: `node_modules/`), dados sensíveis de credenciais de bancos de dados ou pastas privadas de configurações locais de IDEs (como a pasta oculta `.idea/` do IntelliJ) nunca devem ser enviados ao repositório público.

---

### Módulo 7: Mecanismos de Recuperação e Comandos Avançados

Abordagem de situações complexas do cotidiano corporativo, fornecendo controle cirúrgico sobre a árvore de commits.

#### O Arquivamento Temporário: git stash
Útil quando o desenvolvedor possui alterações inacabadas na área de trabalho, mas precisa migrar emergencialmente de branch para corrigir um bug grave sem gerar um commit parcial ou inconsistente.
* `git stash`: Remove as mudanças locais modificadas do Working Directory e as salva em uma pilha de rascunhos voláteis temporários internos do Git.
* `git stash pop`: Resgata e reaplica o último conjunto de modificações salvas na pilha de volta para a área de trabalho ativa.

#### Descarte de Alterações Locais
* `git restore <arquivo>`: Limpa e descarta as edições não salvas de um arquivo no Working Directory, revertendo-o exatamente ao último estado registrado no repositório.

#### A Bifurcação Conceitual: Git Merge vs. Git Rebase
Existem duas estratégias principais para integrar alterações de uma branch em outra:

| Característica | Estratégia: Git Merge | Estratégia: Git Rebase |
| :--- | :--- | :--- |
| **Mecanismo Interno** | Cria um nó especial na árvore conhecido como "Commit de Fusão" (Merge Commit), unindo as histórias de ambos os ramos. | Despacha temporariamente seus commits locais, puxa os commits do ramo base e reaplica seus commits um a um no topo da fila. |
| **Estrutura do Histórico** | Preserva a cronologia exata dos fatos e ramificações visíveis originais do projeto. | Reescreve a história criando um histórico linear perfeito e limpo, como se as ramificações nunca tivessem existido. |
| **Uso Indicado** | Branches públicas e integradoras principais (ex: `main`, `develop`). | Branches de desenvolvimento locais e privadas antes do envio para revisão de equipe. |

> **A Regra de Ouro do Rebase:**
> Nunca aplique um Rebase em ramificações que já tenham sido publicadas em repositórios remotos compartilhados. Como o rebase reescreve cirurgicamente os hashes identificadores dos commits existentes, executá-lo em código compartilhado quebra a árvore de sincronização de todos os outros desenvolvedores da equipe, gerando conflitos massivos.

#### Resolução Prática de Conflitos
Explique que conflitos de fusão não são falhas no sistema, mas sim o Git agindo de forma segura. Ocorrem quando duas pessoas alteram a mesmíssima linha de código de um arquivo e tentam consolidar os dados. O Git interrompe o processo e delega ao desenvolvedor a decisão manual. Ensine a identificar e decifrar as marcações inseridas pelo motor:

```
<<<<<<< HEAD
Código escrito por você na branch atual
=======
Código escrito pelo outro desenvolvedor vindo da outra branch
>>>>>>> nome-da-outra-branch
```
O aluno deve limpar essas marcações e deixar estritamente o código final validado antes de realizar um novo commit de consolidação.

---

### Módulo 8: Padrões Profissionais e Conventional Commits

O encerramento da aula eleva o patamar dos alunos ao apresentar as convenções globais de escrita para mensagens de commit, facilitando a automação de changelogs e a legibilidade histórica.

#### A Estrutura dos Conventional Commits
As mensagens de commit profissionais devem seguir o padrão semântico estrutural estruturado como:

| Tipo | Finalidade Específica e Contexto de Aplicação |
| :--- | :--- |
| **feat** | Introdução de uma nova funcionalidade ou recurso de software no código. |
| **fix** | Correção imediata de um bug ou comportamento anômalo identificado. |
| **docs** | Modificações exclusivas em arquivos de documentação (ex: README.md). |
| **style** | Alterações estéticas e de formatação de código que não impactam a lógica (espaçamentos, ponto e vírgula). |
| **refactor** | Reestruturação de código interno que melhora a arquitetura sem alterar o comportamento externo. |
| **test** | Criação ou modificação de baterias de testes automatizados unitários ou integrados. |
| **chore** | Atualizações de ferramentas de build, tarefas de infraestrutura ou pacotes de dependências externas. |

#### O Commit Atômico
Finalize instruindo a turma a praticar commits atômicos: cada commit deve registrar uma única unidade lógica de alteração que faça sentido isoladamente. Evite o vício de criar commits massivos ao final do dia contendo correções de bugs, refatorações e novas telas misturados em uma única foto sem rastreabilidade semântica.
