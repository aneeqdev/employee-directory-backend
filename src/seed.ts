import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { EmployeesService } from "./employees/employees.service"

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule)
  const employeesService = app.get(EmployeesService)

  console.log("🌱 Starting database seeding...")

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
    {
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@company.com",
      phone: "+1234567895",
      title: "HR Manager",
      department: "HR",
      location: "Berlin",
      hireDate: "2022-09-18",
      salary: 70000,
    },
    {
      firstName: "Alex",
      lastName: "Miller",
      email: "alex.miller@company.com",
      phone: "+1234567896",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Tokyo",
      hireDate: "2023-05-22",
      salary: 88000,
    },
    {
      firstName: "Lisa",
      lastName: "Garcia",
      email: "lisa.garcia@company.com",
      phone: "+1234567897",
      title: "Financial Analyst",
      department: "Finance",
      location: "Sydney",
      hireDate: "2023-06-08",
      salary: 72000,
    },
    {
      firstName: "Tom",
      lastName: "Anderson",
      email: "tom.anderson@company.com",
      phone: "+1234567898",
      title: "Operations Manager",
      department: "Operations",
      location: "New York",
      hireDate: "2022-12-01",
      salary: 82000,
    },
    {
      firstName: "Rachel",
      lastName: "Taylor",
      email: "rachel.taylor@company.com",
      phone: "+1234567899",
      title: "Frontend Developer",
      department: "Engineering",
      location: "San Francisco",
      hireDate: "2023-07-15",
      salary: 78000,
    },
    {
      firstName: "Chris",
      lastName: "Lee",
      email: "chris.lee@company.com",
      phone: "+1234567800",
      title: "Backend Developer",
      department: "Engineering",
      location: "Remote",
      hireDate: "2023-08-03",
      salary: 85000,
    },
    {
      firstName: "Amanda",
      lastName: "White",
      email: "amanda.white@company.com",
      phone: "+1234567801",
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "London",
      hireDate: "2023-09-12",
      salary: 58000,
    },
  ]

  try {
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
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  } finally {
    await app.close()
  }
}

seed()
