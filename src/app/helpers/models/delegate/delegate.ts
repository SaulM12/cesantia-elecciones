import { Grade } from '../organization/grade';
import { Unit } from '../organization/unit';
import { DelegateType } from './delegate-type';

export interface Delegate {
  id: number;
  ci: string;
  phone: string;
  homePhone: string;
  names: string;
  lastName: string;
  secondLastName: string;
  email?: string;
  candidate?: boolean;
  completeInfo?: boolean;
  active: boolean;
  grade: Grade;
  delegateType: DelegateType;
  enableToVote: boolean;
  image?: string;
  unit?: Unit;
}
