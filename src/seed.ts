import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { EmployeesService } from "./employees/employees.service"
import fetch from 'node-fetch';

async function fetchRandomUsers(count: number) {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}&nat=us,gb,ca,au`);
    const data = await response.json() as { results: any[] };
    return data.results;
  } catch (error) {
    console.error("Error fetching random users:", error);
    return [];
  }
}

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Design",
  "Product",
];

const locations = [
  "New York",
  "San Francisco",
  "London",
  "Toronto",
  "Berlin",
  "Tokyo",
  "Sydney",
  "Remote",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function mapRandomUserToEmployee(user: any) {
  return {
    firstName: user.name.first,
    lastName: user.name.last,
    email: user.email,
    phone: user.phone,
    title: user.login.username, // or user.dob.age + ' years old' or a static title
    department: getRandomItem(departments),
    location: getRandomItem(locations),
    hireDate: user.registered.date.split('T')[0],
    salary: Math.floor(Math.random() * 50000) + 50000, // random salary 50k-100k
    avatar: user.picture.large,
  };
}

async function seed() {
  console.log("🌱 Starting database seeding...")

  try {
    const app = await NestFactory.createApplicationContext(AppModule)
    const employeesService = app.get(EmployeesService)

    // Check if employees already exist
    const existingCount = await employeesService.count()
    if (existingCount > 0) {
      console.log(`📊 Database already contains ${existingCount} employees. Skipping seed.`)
      await app.close()
      return
    }

    // Fetch random users
    const randomUsers = await fetchRandomUsers(50)
    if (randomUsers.length === 0) {
      console.log("⚠️ Could not fetch random users. Skipping seed.")
      await app.close()
      return
    }

    const employees = randomUsers.map(mapRandomUserToEmployee)

    // Create employees
    for (const employeeData of employees) {
      await employeesService.create(employeeData)
      console.log(`✅ Created employee: ${employeeData.firstName} ${employeeData.lastName}`)
    }

    console.log(`🎉 Successfully seeded ${employees.length} employees!`)
    await app.close()
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    // Don't exit process in serverless environment
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1)
    }
  }
}

// Only run seed if this file is executed directly
if (require.main === module) {
  seed()
}

export { seed }
