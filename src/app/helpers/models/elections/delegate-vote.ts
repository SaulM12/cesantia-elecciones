import { Delegate } from '../delegate/delegate';
import { Period } from '../organization/period';

export interface DelegateVote {
  id: number;
  delegate: Delegate;
  candidate: Delegate;
  period: Period;
  voteDate: string; // Se utiliza string para representar `LocalDateTime`, que suele mapearse a ISO 8601
  voteControl: string;
}
