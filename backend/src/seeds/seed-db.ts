// // seedDatabase.ts
// import { createConnection, getRepository } from 'typeorm';
// import { UserEntity } from './path/to/your/entities/UserEntity';
// import * as bcrypt from 'bcrypt';

// async function seedDatabase() {
//   // Connect to the database
//   const connection = await createConnection(/* your database config */);

//   try {
//     // Check if the user with the specified email already exists
//     const userRepository = getRepository(UserEntity);
//     const existingUser = await userRepository.findOne({ where: { email: 'nhkhanh1998@gmail.com' } });

//     // If the user already exists, no need to seed again
//     if (existingUser) {
//       console.log('User already seeded.');
//       return;
//     }

//     // Create a new user and save it to the database
//     const newUser = new UserEntity();
//     newUser.email = 'nhkhanh1998@gmail.com';
//     newUser.password = bcrypt.hashSync('abc123', 10);
//     await userRepository.save(newUser);

//     console.log('User seeded successfully.');
//   } catch (error) {
//     console.error('Error seeding the user:', error.message);
//   } finally {
//     // Close the connection after seeding
//     await connection.close();
//   }
// }

// seedDatabase();
