# Trabalho de expansão estácio

Desenvolvido em EXPO (https://www.npmjs.com/package/create-expo-app).

## Inicie

Desenvolvimento

1. Instalar dependências

   ```bash
   npm install
   ```

2. Inicie a aplicação

   ```bash
   npx expo start
   ```

   A aplicação conecta com API Local da empresa.

APK

1. Instale

   ```bash
   npm install -g eas-cli
   ```

2. Authentique

   ```bash
   eas login
   ```

3. Configure

   ```bash
      eas build:configure
   ```

4. Gerar APK (preview ou production)
   Para teste basta rodar
   ```bash
   eas build -p android --profile preview
   ```
   para produção altere o arquivo eas.json (buildtype para apk) e depois rode novamente o comando

## Sobre

Desenvolvido por: Diego Henrique
Matrícula: 202108245518

## Tecnologias

FrameWork Expo (React-Native)
GitHub
SqLite

## Biliotecas

. @react-native-community/netinfo
Umas das objeções, era o aplicativo rodar em modo OFFLINE, a biblioteca foi utilizada para verificar o status de rede.
.expo-sqlite
Precisava rodar um banco local para armazenar todas interações do usuário com o aplicativo.

## Observações finais

O aplicativo foi feito para solucionar um problema simples, que era o estoquista ter que anotar tudo em um papel e depois passar para o sistema, foi passado que deveria ser em formato checklist, permitindo alteração do item, feito todas modificações o APK envia de forma remota para o servidor da empresa (Onde tem um script em .php que faz a mesma alteração que o usuário fazia, porém com uma request em formato JSON vindo do meu APK).

Aplicativo está bem intuitivo, validações na lista e controle sobre regras de negócios podem ser alterados tanto no .php (Fazendo uma resposta gerar um status.ok diferente de 'ok' tanto quanto no APK)
