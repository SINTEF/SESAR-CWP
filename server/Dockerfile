FROM node:18 as builder
USER node
WORKDIR /app
COPY --chown=node:node package.json package-lock.json /app/
RUN npm ci
COPY --chown=node:node ./ /app/
RUN npm run build

FROM python:3.10-alpine as dataset-builder
WORKDIR /dataset
COPY voice-ai/fine-tuning-dataset.txt voice-ai/prepare-fine-tuning-dataset.py ./
RUN python prepare-fine-tuning-dataset.py
RUN pwd

FROM node:18
RUN touch /var/log/app.log && chown node:node /var/log/app.log
USER node
WORKDIR /app
COPY --chown=node:node package.json package-lock.json /app/
RUN npm ci --omit=dev
COPY --from=builder --chown=node:node /app/dist /app
COPY --from=dataset-builder --chown=node:node /dataset/fine-tuning-dataset.jsonl /app/voice-ai/fine-tuning-dataset.jsonl
ENV LISTEN_HOST 0.0.0.0
ENV LISTEN_PORT 8080
ENV LOG_FILE_PATH /var/log/app.log
EXPOSE 8080
CMD ["node", "index.js"]
