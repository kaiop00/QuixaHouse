# :checkered_flag: Alocação  de Apartamentos em Quixadá


Para realização do trabalho final foi pensado em desenvolver uma plataforma que facilite alunos de outras cidades e regiões diferentes de Quixada para poder conhecer e alugar apartamento. Primordialmente o sistema ira contar a possibilidade de adicionar, remover, editar os apartamentos para seus respectivos login’s. O usuário tem a possibilidade de adicionar um anuncio para possíveis apartamentos como também terá acesso ao feed com os apartamentos adicionados por outras pessoas. O usuário só poderá ter acesso a parte de reserva do apartamento ou cadastrar um novo apartamento somente se estiver logado com uma conta valida.  O usuário tem a possibilidade de fazer a oferta com todas as informações que do apartamentos, como localização, ponto de ônibus mais próximo, quantidade de quartos, entre outros. Esse possível usuário poderá ter acesso sem estar logado ao feed podendo logar com uma conta para fazer a reserva do apartamento ou um anúncio. Para fazer a manutenção do site um login de um administrador com acesso a todos os dados do site para possíveis manutenções deve ser criado. 

## :technologist: Membros da equipe

Antonio Kaio Elias Portela- 495707- Engenharia de Software || 
Petrucio de Carvalho Neves Silva- 469854- Engenharia da Computação 

## :people_holding_hands: Papeis ou tipos de usuário da aplicação

Administrador, Locador, Locatario, Usuário Logado/não logado.

## :spiral_calendar: Entidades ou tabelas do sistema

Adicionar apartamento, remover apartamento, editar apartamento, listar apartamento.

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Adicionar apartamento, remover apartamento, editar apartamento, alocar apartamento. O usuario sem estar logado ele tem acesso ao feed de possibilidades porém só consegue alocar um apartamento se estiver um login valigo. E um email nomeado como administrador que tera acesso a todas as informações  do sistema, para possíveis manutenções.

----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:** Vue.js - CSS - HTML
**Backend:** node.js - Strapi - JavaScript 



## :shipit: Operações implementadas para cada entidade da aplicação

Administrador, Locador, Locatario, Usuário Logado/não logado - Apartamento

| Entidade  | Criação | Leitura | Atualização | Remoção |
| --- | ---     | --- | --- | --- |
| Administrador | X |  X  | X  | X |
| Locador       |   |  X  |    |   |
| Locatário     | X |     | X  | X |
| User Logado   |   |  x  |    |   |
| User N/Logado |   |  X  |    |   |

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/entidade1/|
| POST | api/entidade2 |

