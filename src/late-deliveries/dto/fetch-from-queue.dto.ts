import { IsNotEmpty } from 'class-validator';

export class FetchFromQueueDto {
  @IsNotEmpty()
  agentId: number;
}
