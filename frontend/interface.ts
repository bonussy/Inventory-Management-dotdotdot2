export interface VenueItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    dailyrate: number,
    __v: number,
    id: string
  }
  
export interface VenueJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: VenueItem[]
  }

export interface BookingItem {
    nameLastname: string;
    tel: string;
    venue: string;
    bookDate: string;
  }

export interface ProductItem {
  _id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  stockQuantity: number;
  unit: string;
  picture: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface ProductJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: ProductItem[];
}

export interface RequestItem {
  _id: string;
  id: string;
  transactionDate: string;
  transactionType: "stockIn" | "stockOut";
  itemAmount: number;

  user:
    | string
    | {
        _id: string;
        name: string;
        email: string;
        role: "staff" | "admin";
      };

  product_id:
    | string
    | {
        _id: string;
        name: string;
        sku: string;
        category: string;
        stockQuantity: number;
      };

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RequestJson {
  success: boolean;
  count: number;
  pagination: Record<string, unknown>;
  data: RequestItem[];
}