#!/bin/bash
cd /home/kavia/workspace/code-generation/an-infinite-canvas-unpainted-12-86/FrontendWebApplication
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

