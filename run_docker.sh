#!/bin/bash
docker run --rm --name=storybook_install -v "$PWD":/usr/src/app -v "$HOME/.npmrc":"/usr/src/app/.npmrc" -w /usr/src/app node:12-alpine npm install
docker run --rm --name=storybook_api -v "$PWD":/usr/src/app -v "$HOME/.npmrc":"/usr/src/app/.npmrc" -w /usr/src/app -d -p 4001:4000 node:12-alpine yarn server
docker run --rm --name=storybook -v "$PWD":/usr/src/app -v "$HOME/.npmrc":"/usr/src/app/.npmrc" -w /usr/src/app -d -p 4002:6006 node:12-alpine yarn storybook