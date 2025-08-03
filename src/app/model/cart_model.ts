import { ProductModel } from './product_model';

export interface CartModel {
  userId: string;
  product: ProductModel;
}
