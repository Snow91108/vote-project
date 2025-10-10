import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PollService } from './poll.service';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  create(@Body() body: { question: string; options: string[] }) {
    return this.pollService.createPoll(body.question, body.options);
  }

  @Get()
  findAll() {
    return this.pollService.getAllPolls();
  }

  @Post(':optionId/vote')
  vote(@Param('optionId') optionId: string) {
    return this.pollService.vote(+optionId);
  }
}
