const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty'
});

// Test database connection
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    return prisma;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log('🔄 Database disconnected');
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error);
  }
};

module.exports = {
  prisma,
  connectDB,
  disconnectDB
};
