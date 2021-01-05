#!/bin/bash
echo "Cloning the storybook"
mkdir -p ~/storybook/$COMMIT_SHA
cd ~/storybook/$COMMIT_SHA
git clone https://github.com/intellectivelab/unity-ui-storybook.git
cd unity-ui-storybook
git reset --hard $COMMIT_SHA

echo "Stopping containers"
docker stop storybook_install
docker stop storybook
docker stop storybook_api

echo "Launching new instances"
chmod +x ./run_docker.sh && ./run_docker.sh

echo "Cleaning up"
cd ../../
ls -1 -I$COMMIT_SHA | xargs sudo rm -Rf

echo "Done."
