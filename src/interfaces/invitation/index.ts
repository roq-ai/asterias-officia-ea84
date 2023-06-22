import { MeInterface } from 'interfaces/me';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InvitationInterface {
  id?: string;
  invited_email: string;
  role: string;
  me_id?: string;
  inviter_id?: string;
  created_at?: any;
  updated_at?: any;

  me?: MeInterface;
  user?: UserInterface;
  _count?: {};
}

export interface InvitationGetQueryInterface extends GetQueryInterface {
  id?: string;
  invited_email?: string;
  role?: string;
  me_id?: string;
  inviter_id?: string;
}
