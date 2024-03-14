import { Product } from "../entities/product";

export interface ProductsRepository {
  create: (product: Product) => Promise<Product>
  save: (product: Product) => Promise<Product>
  findById: (productId: string) => Promise<Product | null>
  findManyByProperties: (page: number, color?: string, size?: string) => Promise<Product[]>
}