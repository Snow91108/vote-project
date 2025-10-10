import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PollService {
  async createPoll(question: string, options: string[]) {
    return prisma.poll.create({
      data: {
        question,
        options: {
          create: options.map((text) => ({ text })),
        },
      },
      include: { options: true },
    });
  }

  async getAllPolls() {
    return prisma.poll.findMany({ include: { options: true } });
  }

  async vote(optionId: number) {
    return prisma.option.update({
      where: { id: optionId },
      data: { votes: { increment: 1 } },
    });
  }
}
