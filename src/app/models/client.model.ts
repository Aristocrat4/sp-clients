export interface Client {
  clientNumber: number;
  name: string;
  surname: string;
  gender: 'Female' | 'Male';
  personalId: string;
  mobile: string;
  legalAddress: Address;
  actualAddress: Address;
  photo?: string;
}

export interface Address {
  country: string;
  city: string;
  address: string;
}
