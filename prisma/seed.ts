import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

async function seedCreatures() {
  try {
    console.log('🧹 Clearing existing data...');
    await prisma.creature.deleteMany();

    console.log('🔄 Fetching data from external URL...');
    const url =
      'https://raw.githubusercontent.com/mathiasbynens/tibia-boosted-creature/refs/heads/main/data/boosted-creature-history.json';
    const response = await axios.get(url);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: Record<string, string> = response.data;

    const creatures = Object.entries(data).map(([date, name]) => ({
      date: new Date(date),
      name: String(name),
    }));

    console.log(`✅ Preparing to insert ${creatures.length} entries...`);

    await prisma.creature.createMany({
      data: creatures,
    });

    console.log('✅ Seed data inserted successfully.');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedBosses() {
  try {
    console.log('🧹 Clearing existing data...');
    await prisma.creature.deleteMany();

    console.log('🔄 Fetching data from external URL...');
    const url =
      'https://raw.githubusercontent.com/mathiasbynens/tibia-boosted-boss/refs/heads/main/data/boosted-boss-history.json';
    const response = await axios.get(url);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: Record<string, string> = response.data;

    const creatures = Object.entries(data).map(([date, name]) => ({
      date: new Date(date),
      name: String(name),
    }));

    console.log(`✅ Preparing to insert ${creatures.length} entries...`);

    await prisma.boss.createMany({
      data: creatures,
    });

    console.log('✅ Seed data inserted successfully.');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCreatures();
seedBosses();
