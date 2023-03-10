#!/bin/sh

echo "Waiting for PostgresSQL..."

while ! nc -z postgres 5432; do
  sleep 0.3
done

yarn prisma db push
yarn dev