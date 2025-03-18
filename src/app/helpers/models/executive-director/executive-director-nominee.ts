import { Period } from '../organization/period';

export interface ExecutiveDirectorNominee {
  id: number;
  ci: string;
  names: string;
  electionName: string;
  grade:string;
  image:any;
  period: Period;
}
