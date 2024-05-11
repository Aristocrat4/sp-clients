export interface Client {
  clientNumber: number;
  name: string;
  surname: string;
  gender: 'Female' | 'Male';
  personalId: string;
  phoneNumber: string;
  legalAddress: LegalAddress;
  actualAddress: ActualAddress;
  photo?: string;
  id?: '';
}

export interface LegalAddress {
  countryLegal: string;
  cityLegal: string;
  addressLegal: string;
}
export interface ActualAddress {
  countryActual: string;
  cityActual: string;
  addressActual: string;
}
