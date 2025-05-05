#!/bin/sh

echo "Running Prisma migrations..."
npx prisma generate
npx prisma migrate deploy

echo "Starting NestJS app..."
exec node dist/main
