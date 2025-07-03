import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { EmployeesService } from "./employees/employees.service"

async function seed() {
  console.log("🌱 Starting database seeding...")

  try {
    const app = await NestFactory.createApplicationContext(AppModule)
    const employeesService = app.get(EmployeesService)

    const sampleEmployees = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        phone: "+1234567890",
        title: "Senior Software Engineer",
        department: "Engineering",
        location: "New York",
        hireDate: "2023-01-15",
        salary: 95000,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@company.com",
        phone: "+1234567891",
        title: "Product Manager",
        department: "Product",
        location: "San Francisco",
        hireDate: "2023-02-20",
        salary: 110000,
      },
      {
        firstName: "Mike",
        lastName: "Johnson",
        email: "mike.johnson@company.com",
        phone: "+1234567892",
        title: "UX Designer",
        department: "Design",
        location: "Remote",
        hireDate: "2023-03-10",
        salary: 75000,
      },
      {
        firstName: "Sarah",
        lastName: "Wilson",
        email: "sarah.wilson@company.com",
        phone: "+1234567893",
        title: "Marketing Director",
        department: "Marketing",
        location: "London",
        hireDate: "2022-11-05",
        salary: 85000,
      },
      {
        firstName: "David",
        lastName: "Brown",
        email: "david.brown@company.com",
        phone: "+1234567894",
        title: "Sales Representative",
        department: "Sales",
        location: "Toronto",
        hireDate: "2023-04-12",
        salary: 65000,
      },
    ]

    // Check if employees already exist
    const existingCount = await employeesService.count()
    if (existingCount > 0) {
      console.log(`📊 Database already contains ${existingCount} employees. Skipping seed.`)
      await app.close()
      return
    }

    // Create employees
    for (const employeeData of sampleEmployees) {
      await employeesService.create(employeeData)
      console.log(`✅ Created employee: ${employeeData.firstName} ${employeeData.lastName}`)
    }

    console.log(`🎉 Successfully seeded ${sampleEmployees.length} employees!`)
    await app.close()
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

// Only run seed if this file is executed directly
if (require.main === module) {
  seed()
}

export { seed }
