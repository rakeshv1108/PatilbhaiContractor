import Realm from "realm"
export const PARTIESLIST_SCHEMA = "Parties"
export const PARTIY_SCHEMA = "Party"

export const PartySchema = {
  name: PARTIY_SCHEMA,
  //   primaryKey: "1",
  properties: {
    id: { type: "int", default: 0 },
    name: { type: "string", indexed: true },
    done: { type: "bool", default: false },
  },
}

export const PartyListSchema = {
  name: PARTIESLIST_SCHEMA,
  //   primaryKey: "2",
  properties: {
    id: { type: "int", default: 0 },
    name: "string",
    craeationDate: "date",
    todos: { type: "list", objectType: PARTIY_SCHEMA },
  },
}

export const PartyDetailSchema = {
  name: "party_details",
  primaryKey: 'party_id',
  properties: {
    party_id: { type: "string", default: '0' },
    party_name: { type: "string", default: 0 },
    party_contact: "string",
    party_address1: "string",
    party_address2: "string",
    party_GSTNumber: "string",
    party_State: { type: "string", default: 'Gujarat' },
    party_StateCode: { type: "string", default: '24' },
  },
}

export const ServiceDetailSchema = {
  name: "service_details",
  primaryKey: 'service_id',
  properties: {
    service_id: { type: "string", default: '0' },
    desOfGoods: { type: "string", default: ''},
    hsnCode: { type: "string", default: ''},
  },
}

export const VehicleDetailSchema = {
  name: "vehicle_details",
  primaryKey: 'vehicle_id',
  properties: {
    vehicle_id: { type: "string", default: '0' },
    vehicleNumber: { type: "string", default: ''},
    driverName: { type: "string", default: ''},
    vehicleType: { type: "string", default: ''},
  },
}

const databaseOption: any = {
  path: "UserDatabase.realm",
  schema: [PartyDetailSchema, ServiceDetailSchema,PartySchema, PartyListSchema, VehicleDetailSchema],
  schemaVersion: 0, // optional
}

// function for create new schema
export const createNewSchema = (databaseName, schemaName, property) => {
  new Realm({
    path: `${databaseName}`,
    schema: [
      {
        name: `${schemaName}`,
        properties: property,
      },
    ],
  })
}

// function for add new item in schema.
export const addPropertyToSchema = (schemaName, property) =>
  new Promise((resolve: any, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          realm.create(schemaName, property)
          let response = {
            status: "success",
            property: property,
          }
          resolve(response)
        })
      })
      .catch((error) => {
        console.log("===Error", error)
        reject(error)
      })
  })

// function for update item in schema.
export const updateItemInSchema = (schemaName, property) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          if (schemaName == "party_details") {
            let updatingItem: any = realm.objectForPrimaryKey(schemaName, property.party_id)
            updatingItem.party_name = property.party_name
            updatingItem.party_address1 = property.party_address1
            updatingItem.party_address2 = property.party_address2
            updatingItem.party_GSTNumber = property.party_GSTNumber
            updatingItem.party_State = property.party_State
            updatingItem.party_StateCode = property.party_StateCode
            updatingItem.party_contact = property.party_contact      
          }else if (schemaName == "service_details"){
            let updatingItem: any = realm.objectForPrimaryKey(schemaName, property.service_id)
            updatingItem.desOfGoods = property.desOfGoods
            updatingItem.hsnCode = property.hsnCode
          }
          else if (schemaName == "vehicle_details") {
            let updatingItem: any = realm.objectForPrimaryKey(schemaName, property.vehicle_id)
            updatingItem.vehicleNumber = property.vehicleNumber
            updatingItem.driverName = property.driverName
            updatingItem.vehicleType = property.vehicleType
          }
          resolve()
        })
      })
      .catch((error) => reject(error))
  })

// functions for PartyList
export const insertNewPartyList = (newPartyList) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          realm.create(PARTIY_SCHEMA, newPartyList)
          resolve(newPartyList)
        })
      })
      .catch((error) => {
        console.log("===error")
        reject(error)
      })
  })

export const updatePartyList = (partyList) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          let updatingPartyList: any = realm.objectForPrimaryKey(PARTIESLIST_SCHEMA, partyList.id)
          updatingPartyList.name = partyList.name
          resolve()
        })
      })
      .catch((error) => reject(error))
  })

export const deletePropertyToSchema = (schemaName, itemId) =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          let deletedItem = realm.objectForPrimaryKey(schemaName, itemId)
          realm.delete(deletedItem)
          resolve()
        })
      })
      .catch((error) => reject(error))
  })

export const deleteAllParties = () =>
  new Promise<void>((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          let allPartyList = realm.objects(PARTIESLIST_SCHEMA)
          realm.delete(allPartyList)
          resolve()
        })
      })
      .catch((error) => reject(error))
  })

export const queryAllPartyList = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then((realm) => {
        realm.write(() => {
          let allPartyList = realm.objects(PARTIESLIST_SCHEMA)
          resolve(allPartyList)
        })
      })
      .catch((error) => reject(error))
  })

export default new Realm(databaseOption)
