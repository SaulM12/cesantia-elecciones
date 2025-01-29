import { InvitationStatus } from "../../enums/initation_status";
import { Delegate } from "../delegate/delegate";

export interface Quadrant {
  id: number;
  acronym: string;
  description: string;
  quadrantOrder: number;
}

export interface QuadrantDto {
  id: number;
  description: string;
  acronym: string;
  quadrantOrder: number;
  tables: TableDto[];
}

export interface TableDto {
  id: number;
  tableNumber: number;
  invitations: InvitationDto[];
}

export interface InvitationDto {
  id: number;
  chairNumber: number;
  status: InvitationStatus;
  delegate:Delegate
}
