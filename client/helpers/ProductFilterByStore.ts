import type { Product} from "../models/product";
import type { Store} from "../models/Store";

export const productFilterByStore = (products: Product[] | undefined, store: any): Product[] => {
    if (products) return products.filter(p=> p.store.name === store)
    return []
}