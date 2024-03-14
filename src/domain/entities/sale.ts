import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface SaleProps {
  productId: UniqueEntityID
  quantity: number
  amount: number
  createdAt: Date
}

export class Sale extends Entity<SaleProps> {
  get quantity() {
    return this.props.quantity
  }

  get amount() {
    return this.props.amount
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<SaleProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Sale({
      ...props,
      createdAt: new Date(),
    }, id)
  }
}