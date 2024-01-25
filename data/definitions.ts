export type Person = {
  promotions: any;
  id: number;
  firstName: string;
  surname: string;
  email: string;
  city: string;
  country: string;
  telephone: string;
  devices: Devices[];
};

export type Location = {
  city: string;
  country: string;
};

export type Devices = "iPhone" | "android" | "desktop";

export type Promotion = {
  id: number
  clientEmail: string;
  telephone: string;
  promotion: string;
  responded: "Yes" | "No";
};

export type Transaction = {
  id: number;
  buyerName: string;
  item: string;
  price: number;
  store: string;
  transactionDate: Date;
};

export type Transfer = {
  id: number;
  senderId: number;
  recipientId: number;
  amount: number;
  date: Date;
};

export type ImportTemplate = {
  people: Person[],
  promotions: Promotion[],
  transactions: Transaction[],
  transfers: Transfer[]
}

export type StoreInsight = {
  bestSeller: string,
  bestSellerRevenue: number,
  mostProfitableStore: string,
  storeProfit: number
}

export type TotalPromotions = {
  totalYes: number,
  totalNo: number
}

export type AllTransfers = {
  sender: string,
  recipient: string,
  amount: number,
  date: Date
}