import { Product } from '../../backend/dist/client/models/product';

export const FilterProductsByStore = (storeId: string, products : Product[]) => {
  return products.filter(p => p.store._id === storeId)
}
