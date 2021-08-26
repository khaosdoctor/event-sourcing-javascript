const { ObjectId } = require('mongodb')
const { EventEntity } = require('@irontitan/paradox')
const { PortWasCreatedEvent } = require('./events/PortWasCreatedEvent')
const { IPortCreationParams } = require('../structures/IPortCreationParams')
const { Ship } = require('../ship/entity')
const { ShipUndockedEvent } = require('./events/ShipUndockedEvent')
const { ShipDockedEvent } = require('./events/ShipDockedEvent')
const { PortWasDeletedEvent } = require('./events/PortWasDeletedEvent')

export class Port extends EventEntity<Port> {
  public id: ObjectId | null = null
  public name: string | null = null
  public dockedShips: ObjectId[] = []
  public createdAt: Date | null = null
  public createdBy: string | null = null
  public updatedAt: Date | null = null
  public updatedBy: string | null = null
  public deletedAt: Date | null = null
  public deletedBy: string | null = null

  static readonly collection = 'ports'

  constructor () {
    super({
      [PortWasCreatedEvent.eventName]: PortWasCreatedEvent.commit,
      [ShipUndockedEvent.eventName]: ShipUndockedEvent.commit,
      [ShipDockedEvent.eventName]: ShipDockedEvent.commit,
      [PortWasDeletedEvent.eventName]: PortWasDeletedEvent.commit
    })
  }

  static create (params: IPortCreationParams, user: string): Port {
    const port = new Port()

    port.pushNewEvents([
      new PortWasCreatedEvent({ id: new ObjectId(), ...params }, user)
    ])

    return port
  }

  undockShip (ship: Ship, reason: string, user: string): Port {
    this.pushNewEvents([
      new ShipUndockedEvent({ shipId: ship.id as ObjectId, reason }, user)
    ])

    return this
  }

  dockShip (ship: Ship, user: string): Port {
    this.pushNewEvents([
      new ShipDockedEvent({ shipId: ship.id as ObjectId }, user)
    ])

    return this
  }

  delete (user: string) {
    this.pushNewEvents([
      new PortWasDeletedEvent(user)
    ])

    return this
  }

  get state () {
    const currentState = this.reducer.reduce(new Port(), [
      ...this.persistedEvents,
      ...this.pendingEvents
    ])

    return {
      id: currentState.id,
      name: currentState.name,
      dockedShips: currentState.dockedShips,
      createdAt: currentState.createdAt,
      createdBy: currentState.createdBy,
      updatedAt: currentState.updatedAt,
      updatedBy: currentState.updatedBy,
      deletedAt: currentState.deletedAt,
      deletedBy: currentState.deletedBy
    }
  }
}
