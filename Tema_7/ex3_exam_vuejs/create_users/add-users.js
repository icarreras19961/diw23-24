// Create a function to add a new user
function addUser(login, password, email, firstName, lastName, birthday, phone, address, isBuyer) {
  // Check if localStorage already has users
  let users = JSON.parse(localStorage.getItem('users')) || [];

  // Create a new user object
  const newUser = {
      login,
      password,
      email,
      firstName,
      lastName,
      birthday,
      phone,
      address,
      isBuyer
  };

  // Add the new user to the array
  users.push(newUser);

  // Save the updated user array back to localStorage
  localStorage.setItem('users', JSON.stringify(users));
}

// Create a function to get users information
function getUsers() {
  // Retrieve and return users from localStorage
  return JSON.parse(localStorage.getItem('users')) || [];
}

function addFakeUsers() {
  addUser('john_doe', 'password123', 'john@example.com', 'John', 'Doe', '1990-01-01', '1234567890', '123 Main St', true);
  addUser('jane_smith', 'pass456', 'jane@example.com', 'Jane', 'Smith', '1985-05-15', '9876543210', '456 Oak St', false);
  addUser('alice_jones', 'secret789', 'alice@example.com', 'Alice', 'Jones', '1995-08-20', '5551112233', '789 Elm St', true);
  addUser('bob_carter', 'secure987', 'bob@example.com', 'Bob', 'Carter', '1980-12-10', '4445556677', '456 Pine St', false);
  addUser('emily_white', 'emilypass', 'emily@example.com', 'Emily', 'White', '1993-04-25', '9871234567', '789 Maple St', true);
  addUser('david_miller', 'davidpass', 'david@example.com', 'David', 'Miller', '1988-07-03', '5554443322', '101 Oak Ave', false);
  addUser('sophie_brown', 'sophiepass', 'sophie@example.com', 'Sophie', 'Brown', '1992-09-15', '9878765432', '222 Cedar St', true);
  addUser('michael_jackson', 'kingofpop', 'michael@example.com', 'Michael', 'Jackson', '1958-08-29', '1239876543', 'Neverland Ranch', false);
  addUser('natalie_smith', 'nataliepass', 'natalie@example.com', 'Natalie', 'Smith', '1987-06-18', '7778889999', '555 Birch St', true);
  addUser('ryan_harris', 'ryanpass', 'ryan@example.com', 'Ryan', 'Harris', '1997-03-08', '1112223333', '999 Oakwood Ln', false);
}

addFakeUsers();

console.log(getUsers());

