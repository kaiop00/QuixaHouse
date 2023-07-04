# :checkered_flag: Alocação  de Apartamentos em Quixadá


Para realização do trabalho final foi pensado em desenvolver uma plataforma que facilite alunos de outras cidades e regiões diferentes de Quixada para poder conhecer e alugar apartamento. Primordialmente o sistema ira contar a possibilidade de adicionar, remover, editar os apartamentos para seus respectivos login’s. O usuário tem a possibilidade de adicionar um anúncio para possíveis apartamentos como também terá acesso ao feed com os apartamentos adicionados por outras pessoas. O usuário só poderá ter acesso a parte de reserva do apartamento ou cadastrar um novo apartamento somente se estiver logado com uma conta válida.  O usuário tem a possibilidade de fazer o anúncio com todas as informações do apartamentos, como localização, ponto de ônibus mais próximo, quantidade de quartos, entre outros. Esse possível usuário poderá ter acesso sem estar logado ao feed podendo logar com uma conta para fazer o anúncio do apartamento.

## :technologist: Membros da equipe

Antonio Kaio Elias Portela- 495707- Engenharia de Software

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

Locador, Locatario, Usuário Logado/não logado.

## :spiral_calendar: Entidades ou tabelas do sistema

Adicionar imóvel, remover imóvel, editar imóvel, listar imóvel. //  
Adicionar usuário, remover usuário, editar usuário .



## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

Adicionar apartamento, remover apartamento, editar apartamento, alocar apartamento. O usuario sem estar logado ele tem acesso ao feed de possibilidades porém só consegue anunciar um apartamento se estiver um login váligo.

----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:** Vue.js - CSS - HTML
**Backend:** node.js - Strapi - TypeScript 



## :shipit: Operações implementadas para cada entidade da aplicação

Locador, Locatario, Usuário Logado/não logado - Apartamento

| Entidade  | Criação | Leitura | Atualização | Remoção |
| --- | ---     | --- | --- | --- |
| Locador       |   |  X  |    |   |
| Locatário     | X |  X  | X  | X |
| User Logado   |   |  x  |    |   |
| User N/Logado |   |  X  |    |   |

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| POST | /api/apartments | 
| GET  | /api/apartments|
| PUT  | /api/apartments/:id |
| DELET| /api/apartments/:id |

| POST | /api/auth/local/register | 
| GET  | /api/users/me |
| PUT  | /api/users/:id |
| DELET| /api/users/:id |

