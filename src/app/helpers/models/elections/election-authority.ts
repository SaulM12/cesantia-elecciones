import { Quadrant } from '../organization/quadrant';
import { ElectionType } from './election-type';

export default interface ElectionAuthority {
  id: number;
  electionType: ElectionType; // Relación con el tipo de elección
  quadrant: Quadrant; // Relación con el cuadrante
  role: string; // PRESIDENTE o SECRETARIO
  fullName: string;
  grade: string;
  ci: string;
  phone: string;
}
