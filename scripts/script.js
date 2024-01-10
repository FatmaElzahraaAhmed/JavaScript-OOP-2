class Person {
  constructor(name, age, money, sleepMood, healthRate) {
    this.name = name;
    this.age = age;
    this.money = money;
    this.sleepMood = sleepMood;
    this.healthRate = healthRate;
  }

  sleep(hours) {
    if (hours === 7) {
      this.sleepMood = "happy";
    } else if (hours < 7) {
      this.sleepMood = "tired";
    } else {
      this.sleepMood = "lazy";
    }
  }

  eat(meals) {
    switch (meals) {
      case 3:
        this.healthRate = 100;
        break;
      case 2:
        this.healthRate = 75;
        break;
      case 1:
        this.healthRate = 50;
        break;
    }
  }

  buy(items) {
    this.money -= items * 10;
  }
}

class Employee extends Person {
  constructor(
    name,
    age,
    money,
    sleepMood,
    healthRate,
    id,
    email,
    workMood,
    salary,
    isManager
  ) {
    super(name, age, money, sleepMood, healthRate);
    this.id = id;
    this.email = email;
    this.workMood = workMood;
    this.salary = salary >= 1000 ? salary : 1000;
    this.isManager = isManager;
  }

  work(hours) {
    if (hours === 8) {
      this.workMood = "happy";
    } else if (hours > 8) {
      this.workMood = "tired";
    } else {
      this.workMood = "lazy";
    }
  }
}

class Office {
  constructor(name) {
    this.name = name;
    this.employees = [];
  }

  getAllEmployees() {
    return this.employees;
  }

  getEmployee(empEmail) {
    const employee = this.employees.find((emp) => emp.email === empEmail);
    if (employee) {
      return employee;
    }
    return null;
  }

  hire(employee) {
    this.employees.push(employee);
  }

  fire(empId) {
    this.employees = this.employees.filter((emp) => emp.email !== empId);
  }
}

const officeName = prompt("Enter the office name:");
const office = new Office(officeName);

while (true) {
  const option = prompt(
    `Menu:\n1. Add new employee (enter "add")\n2. Get all employees (enter "getall")\n3. Get employee data (enter "getemp")\n4. Fire an employee (enter "fire")\n5. Sleep (enter "sleep")\n6. Eat (enter "eat")\n7. Buy (enter "buy")\n8. Work (enter "work")\n9. Quit (enter "q")\nEnter your choice:`
  );

  switch (option.toLowerCase()) {
    case "add":
      const employeeType = prompt(
        "Enter employee type: (1) Manager or (2) Normal"
      );
      if (employeeType === "1") {
        const nameManager = prompt("Enter manager name:");
        const ageManager = prompt("Enter manager age:");
        const emailManager = prompt("Enter manager email:");
        const newManager = new Employee(
          nameManager,
          ageManager,
          1000,
          "happy",
          100,
          emailManager,
          emailManager,
          "happy",
          2000,
          true
        );
        office.hire(newManager);
        console.log("Manager added successfully.");
      } else if (employeeType === "2") {
        const nameNormal = prompt("Enter normal employee name:");
        const ageNormal = prompt("Enter normal employee age:");
        const emailNormal = prompt("Enter normal employee email:");
        const newNormalEmployee = new Employee(
          nameNormal,
          ageNormal,
          1000,
          "happy",
          100,
          emailNormal,
          emailNormal,
          "happy",
          2000,
          false
        );
        office.hire(newNormalEmployee);
        console.log("Normal employee added successfully.");
      } else {
        console.log("Invalid employee type.");
      }
      break;

    case "getall":
      const allEmployees = office.getAllEmployees();
      console.log("All Employees:");
      console.log(JSON.stringify(allEmployees, null, 2));
      break;

    case "getemp":
      const empId = prompt("Enter employee email:");
      const employeeData = office.getEmployee(empId);
      if (employeeData) {
        console.log("Employee Data:");
        console.log(JSON.stringify(employeeData, null, 2));
      } else {
        console.log("Employee not found.");
      }
      break;

    case "fire":
      const empToFire = prompt("Enter employee email to fire:");
      office.fire(empToFire);
      console.log("Employee fired.");
      break;

    case "sleep":
      const sleepHours = prompt("Enter sleep hours:");
      const empToSleep = prompt("Enter employee email to update sleep mood:");
      const employeeToSleep = office.getEmployee(empToSleep);
      if (employeeToSleep instanceof Person) {
        employeeToSleep.sleep(sleepHours);
        console.log("Sleep mood updated for the selected employee.");
      } else {
        console.log("Employee not found or not of type Person.");
      }
      break;

    case "eat":
      const meals = prompt("Enter number of meals:");
      const empToEat = prompt("Enter employee email to update health rate:");
      const employeeToEat = office.getEmployee(empToEat);
      if (employeeToEat instanceof Person) {
        employeeToEat.eat(Number(meals));
        console.log("Health rate updated for the selected employee.");
      } else {
        console.log("Employee not found or not of type Person.");
      }
      break;

    case "buy":
      const itemsToBuy = prompt("Enter number of items to buy:");
      const empToBuy = prompt("Enter employee email to update money:");
      const employeeToBuy = office.getEmployee(empToBuy);
      if (employeeToBuy instanceof Person) {
        employeeToBuy.buy(itemsToBuy);
        console.log("Money updated for the selected employee.");
      } else {
        console.log("Employee not found or not of type Person.");
      }
      break;

    case "work":
      const workHours = prompt("Enter work hours:");
      const empToWork = prompt("Enter employee email to update work mood:");
      const employeeToWork = office.getEmployee(empToWork);
      if (employeeToWork instanceof Employee) {
        employeeToWork.work(workHours);
        console.log("Work mood updated for the selected employee.");
      } else {
        console.log("Employee not found or not of type Employee.");
      }
      break;

    case "q":
      alert("Quitting the application.");
      break;

    default:
      alert("Invalid option. Please try again.");
      break;
  }
  if (option === "q") {
    break;
  }
}
