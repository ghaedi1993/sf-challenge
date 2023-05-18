import { IsNotEmpty, IsOptional } from 'class-validator';

export class FetchFromQueueDto {
  @IsNotEmpty()
  agentId: number;
}
