let faker = require("faker");

let dataBase = { Users: [] };

for (let i = 1; i <= 1000; i++) {
  let userName = faker.random.word();
  dataBase.Users.push({
    id: i,
    name: userName,
    email: userName + "@example.com",
  });
}

console.log(JSON.stringify(dataBase, null, 2));
