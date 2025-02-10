import { Delegate } from '../delegate/delegate';
import { Quadrant } from '../organization/quadrant';
import { ElectionType } from './election-type';

export interface CandidateElection {
  id: number;
  delegate: Delegate;
  electionType: ElectionType;
  quadrant: Quadrant;
  active: boolean; // Indica si sigue como candidato
}
