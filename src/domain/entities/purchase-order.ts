import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

interface PurchaseOrderProps {
  productId: UniqueEntityID
  quantity: number
  createdAt: Date
}

export class PurchaseOrder extends Entity<PurchaseOrderProps> {
  get quantity() {
    return this.props.quantity
  }

  static create(props: Optional<PurchaseOrderProps, 'createdAt'>, id?: UniqueEntityID) {
    return new PurchaseOrder({
      ...props,
      createdAt: new Date(),
    }, id)
  }
}