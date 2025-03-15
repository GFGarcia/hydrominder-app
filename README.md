Hydrominder App

Sobre o Projeto

O Hydrominder App é um aplicativo mobile desenvolvido com Expo e React Native, focado no monitoramento da ingestão de água. O app permite que os usuários registrem suas doses de água, definam metas diárias e configurem lembretes para manter uma hidratação adequada.

Tecnologias Utilizadas

Frontend

O frontend do aplicativo foi desenvolvido com React Native e Expo, utilizando diversas bibliotecas para garantir uma experiência moderna e eficiente:

Framework: React Native (com Expo)

Navegação: Expo Router

Estilização: Tailwind CSS + NativeWind

Componentes UI: Gluestack UI, React Native Paper

Gerenciamento de Estado: Zustand, React Query

Formulários e Validação: React Hook Form, Zod

Gráficos e Visualização de Dados: React Native Chart Kit

Animações: React Native Reanimated, Legend Motion

Ícones: Lucide React Native, React Native Vector Icons

Notificações: Expo Notifications

Armazenamento Local: Async Storage

Backend

O backend do aplicativo utiliza Supabase, que atua como banco de dados e serviço de autenticação em tempo real. As principais funcionalidades incluem:

Banco de Dados: Supabase (PostgreSQL)

Autenticação: Supabase Auth

API REST: Gerada automaticamente pelo Supabase

Manipulação de Arquivos: Expo Image Picker

Estrutura do Banco de Dados

O banco de dados do Hydrominder App é modelado no Supabase e consiste nas seguintes tabelas:

profiles

Armazena informações dos perfis de usuários.

id (UUID) - Identificador único

updated_at (timestampz) - Data de atualização

username (text) - Nome do usuário

avatar_url (text) - URL do avatar do usuário

Relacionamento: Ligado a auth.users.id

doses

Armazena os registros de ingestão de água.

id (int8) - Identificador único

dose (int4) - Quantidade de água ingerida (ml)

user_id (UUID) - Referência ao usuário

created_at (timestampz) - Data e hora do registro

Relacionamento: Ligado a auth.users.id

goals

Armazena as metas diárias de ingestão de água.

id (int8) - Identificador único

goal (int4) - Meta de ingestão (ml)

user_id (UUID) - Referência ao usuário

created_at (date) - Data de criação

updated_at (date) - Data de atualização

Relacionamento: Ligado a auth.users.id

alarms

Armazena os lembretes para ingestão de água.

id (int8) - Identificador único

user_id (UUID) - Referência ao usuário

created_at (timestampz) - Data de criação

hour (int2) - Hora do lembrete

min (int2) - Minuto do lembrete

Relacionamento: Ligado a auth.users.id

Considerações Finais

O Hydrominder App foi projetado para ser um aplicativo 100% mobile, proporcionando uma interface intuitiva e eficiente para o gerenciamento da hidratação diária. O uso do Supabase para backend permite uma implementação rápida e escalável, ideal para provas de conceito e projetos ágeis.
