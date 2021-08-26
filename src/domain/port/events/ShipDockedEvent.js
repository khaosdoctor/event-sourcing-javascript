const { Event } = require('@irontitan/paradox')
const { Port } = require('../entity')
const { ObjectId } = require('mongodb')

interface IEventCreationParams {
  shipId: ObjectId
}

export class ShipDockedEvent extends Event<IEventCreationParams> {
  static readonly eventName = 'ship-was-docked'
  readonly user: string

  constructor (data: IEventCreationParams, user: string) {
    super(ShipDockedEvent.eventName, data)
    this.user = user
  }

  static commit (state: Port, event: ShipDockedEvent): Port {
    if (!state.dockedShips.find((shipId) => shipId.equals(event.data.shipId))) state.dockedShips.push(event.data.shipId)
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}
