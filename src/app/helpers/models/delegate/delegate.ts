import { Grade } from '../organization/grade';
import { DelegateType } from './delegate-type';

export interface Delegate {
  id: number;
  ci: string;
  phone: string;
  ingresoAsis?: string;
  dependence?: string;
  unitName?: string;
  names: string;
  email: string;
  candidate: boolean;
  confirmation?: boolean;
  active: boolean;
  enableToVote: boolean;
  grade: Grade;
  delegateType?: DelegateType;
}
