import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Product } from '../../entities/product'
import { ProductsRepository } from '../products-repository';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async create(product: Product) {
    this.items.push(product)
    return product
  }

  async save(product: Product) {
    const productIndex = this.items.findIndex((item) => item.id === product.id)

    if (productIndex >= 0) {
      this.items[productIndex] = product
    }

    return product
  }

  async findById(productId: string) {
    const product = this.items.find((product) => {
      return product.id.toString() === new UniqueEntityID(productId).toString()
    })

    return product || null
  }

  async findManyByProperties(page: number, color?: string, size?: string) {
    const products = this.items.filter((product) => {
      if (color && product.color.toLowerCase() !== color.toLowerCase()) return false
      if (size && product.size !== size) return false
      return true
    }).slice((page - 1) * 20, page * 20)

    return products
  }
}
