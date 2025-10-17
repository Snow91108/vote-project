import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../drizzle/db';
import { user } from '../drizzle/migrations/schema';


@Injectable()
export class UserService {
  // ✅ Create user
  async create(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    age: number;
  }) {
    await db.insert(user).values(data);

    // Return the created user
    const createdUser = await db.select().from(user).where(eq(user.email, data.email));
    return createdUser[0];
  }

  // ✅ Get all users
  async findAll() {
    return await db.select().from(user); // array of users
  }

  // ✅ Get single user
  async findOne(id: number) {
    const result = await db.select().from(user).where(eq(user.id, id));
    return result[0] || null;
  }

  // ✅ Update user
  async update(
    id: number,
    data: { name?: string; email?: string; password?: string; phone?: string; age?: number },
  ) {
    await db.update(user).set(data).where(eq(user.id, id));

    // Return updated user
    const updatedUser = await db.select().from(user).where(eq(user.id, id));
    return updatedUser[0];
  }

    // ✅ Delete user
    async remove(id: number) {
      const deletedUser = await db.select().from(user).where(eq(user.id, id));
      await db.delete(user).where(eq(user.id, id));
      return deletedUser[0] || null;
    }
  }
