const { Event } = require('@irontitan/paradox')
const { ObjectId } = require('mongodb')
const { Ship } = require('../entity')
const { IShipCreationParams } = require('../../structures/IShipCreationParams')

interface IEventCreationParams extends IShipCreationParams {
  id: ObjectId
}

export class ShipWasCreatedEvent extends Event<IEventCreationParams> {
  static readonly eventName = 'ship-was-created'
  readonly user: string

  constructor (data: IEventCreationParams, user: string) {
    super(ShipWasCreatedEvent.eventName, data)
    this.user = user
  }

  static commit (state: Ship, event: ShipWasCreatedEvent): Ship {
    state.id = event.data.id
    state.name = event.data.name
    state.currentPort = new ObjectId(event.data.currentPort)
    state.createdAt = event.timestamp
    state.createdBy = event.user
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}
