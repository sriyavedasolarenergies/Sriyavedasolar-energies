// Firebase has been removed from this project.
// This file provides stubbed exports so components that previously
// imported from `src/config/firebase.ts` continue to build without
// runtime Firebase dependencies. All functions will throw if called.

export interface PartnerProfile {
  name?: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  gstin?: string;
  website?: string;
}

const removedError = () => {
  throw new Error('Firebase has been removed from this project. Remove or replace Firebase-dependent code.');
};

export const auth = null as any;
export const db = null as any;

export const useAuth = () => {
  // Keep signature, but indicate no auth available
  return { user: null, loading: false } as const;
};

export const registerPartner = async (_email: string, _password: string, _name?: string) => {
  removedError();
};

export const loginPartner = async (_email: string, _password: string) => {
  removedError();
};

export const resetPassword = async (_email: string) => {
  removedError();
};

export const updatePartnerProfile = async (_uid: string, _data: Partial<PartnerProfile>) => {
  removedError();
};

export const isAdmin = (_user: any) => false;