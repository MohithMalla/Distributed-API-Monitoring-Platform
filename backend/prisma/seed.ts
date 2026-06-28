import * as bcrypt from 'bcrypt'; 
import { PrismaClient, Role, HttpMethod, MonitorStatus, IncidentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Clean the database to prevent duplicates on multiple runs
  await prisma.incident.deleteMany();
  await prisma.monitoringLog.deleteMany();
  await prisma.monitor.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing data.');

  // 2. Create a Test User
  // 2. Create a Test User with a REAL hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);

  const demoUser = await prisma.user.create({
    data: {
      name: 'Demo Admin',
      email: 'admin@demo.com',
      password: hashedPassword, // Uses the real hash we just generated!
      role: Role.ADMIN,
    },
  });

  console.log(`👤 Created User: ${demoUser.email}`);

  // 3. Create Project 1 (E-Commerce APIs) with nested Monitors and Logs
  await prisma.project.create({
    data: {
      name: 'E-Commerce Infrastructure',
      description: 'Core microservices for the main shopping application',
      ownerId: demoUser.id,
      monitors: {
        create: [
          // A Healthy Monitor
          {
            name: 'Authentication Service',
            url: 'https://api.example.com/auth/health',
            method: HttpMethod.GET,
            intervalSeconds: 60,
            expectedStatus: 200,
            lastStatus: MonitorStatus.UP,
            averageLatency: 124.5,
            isActive: true,
            logs: {
              create: [
                { responseTime: 120, isHealthy: true, statusCode: 200 },
                { responseTime: 129, isHealthy: true, statusCode: 200 },
              ],
            },
          },
          // A Down Monitor with an active Incident
          {
            name: 'Payment Gateway (Stripe)',
            url: 'https://api.example.com/payments/webhook',
            method: HttpMethod.POST,
            intervalSeconds: 120,
            expectedStatus: 200,
            lastStatus: MonitorStatus.DOWN,
            consecutiveFailures: 4,
            isActive: true,
            incidents: {
              create: [
                {
                  reason: 'Connection timeout to payment provider. 503 Service Unavailable.',
                  status: IncidentStatus.OPEN,
                },
              ],
            },
            logs: {
              create: [
                { responseTime: 5005, isHealthy: false, errorMessage: 'Timeout Error', statusCode: 503 },
                { responseTime: 5010, isHealthy: false, errorMessage: 'Timeout Error', statusCode: 503 },
              ],
            },
          },
        ],
      },
    },
  });

  // 4. Create Project 2 (Internal Tools)
  await prisma.project.create({
    data: {
      name: 'Internal Tools & Dashboards',
      description: 'APIs used by the admin panel and internal staff',
      ownerId: demoUser.id,
      monitors: {
        create: [
          {
            name: 'Employee Directory DB',
            url: 'https://internal.example.com/db-status',
            method: HttpMethod.GET,
            intervalSeconds: 300,
            expectedStatus: 200,
            lastStatus: MonitorStatus.UP,
            isActive: true,
          },
        ],
      },
    },
  });

  console.log('✅ Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });