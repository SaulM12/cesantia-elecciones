import { Delegate } from '../delegate/delegate';
import { ExecutiveDirectorNominee } from './executive-director-nominee';

export interface ExecutiveDirectorVote {
  id: number;
  nominee: ExecutiveDirectorNominee;
  delegate: Delegate;
  periodId: number;
  voteDate: string; // ISO 8601 date string
  voteControl: string;
}
