# ─── BUILD STAGE ───
FROM node:22-alpine AS builder    
WORKDIR /app

# Copy dependency graphs and ORM schemas
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma Client
RUN npm ci
RUN npx prisma generate

# Copy application resource tree
COPY . .

# Compile TypeScript codebase via NestJS CLI
RUN npm run build

# ─── PRODUCTION RUNTIME STAGE ───
FROM node:22-alpine AS runner     
WORKDIR /app

ENV NODE_ENV=production

# Copy built distribution, generated client engines, and minimal dependency trees
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

# Fire up migrations and launch the app engine
CMD ["sh", "-c", "npx prisma db push && node dist/src/main.js"]