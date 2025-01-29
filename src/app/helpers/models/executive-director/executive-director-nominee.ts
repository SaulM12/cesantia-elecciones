import { Period } from '../organization/period';

export interface ExecutiveDirectorNominee {
  id: number;
  ci: string;
  names: string;
  lastName: string;
  secondLastName: string;
  electionName: string;
  image:any;
  period: Period;
}
