const { Event } = require('@irontitan/paradox')
const { Ship } = require('../entity')
const { ObjectId } = require('mongodb')

interface IEventCreationParams {
  portId: ObjectId
}

export class ShipDockedEvent extends Event<IEventCreationParams> {
  static readonly eventName = 'ship-docked'
  readonly user: string

  constructor (data: IEventCreationParams, user: string) {
    super(ShipDockedEvent.eventName, data)
    this.user = user
  }

  static commit (state: Ship, event: ShipDockedEvent): Ship {
    state.currentPort = event.data.portId
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}
