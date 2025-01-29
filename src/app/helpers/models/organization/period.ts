import { State } from "../system/state";

export interface Period {
    id: number;
    description: string;
    yearPeriod?: string; // Opcional porque no tiene `nullable = false`
    startDate?: string; // Representa LocalDate en formato ISO (YYYY-MM-DD), es opcional
    endDate?: string; // Igual que startDate
    state?: State;
  }