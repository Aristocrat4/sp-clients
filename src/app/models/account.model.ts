export interface Account {
  accountNumber: number;
  clientNumber: number;
  type: 'Current' | 'Savings' | 'Accumulative';
  currency: string[];
  status: 'Active' | 'Closed';
}

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}
