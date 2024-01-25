import { utilService } from './util.service.js'

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType, delay) {
  let entities = JSON.parse(localStorage.getItem(entityType)) || []
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

async function get(entityType, entityId) {
  const entities = await query(entityType)
  const entity = entities.find((currEntity) => (currEntity._id = entityId))
  if (!entity)
    throw new Error(
      `Could not find entityId: [${entityId}], in collection: [${entityType}]`,
    )
  return entity
}

async function post(entityType, newEntity) {
  const entities = await query(entityType)
  const entityToAdd = { ...newEntity, _id: utilService.makeId() }
  let newEntities
  if (entities.length === 0) newEntities = [entityToAdd]
  else newEntities = [...entities, entityToAdd]
  _save(entityType, newEntities)
  return entityToAdd
}

async function put(entityType, newEntity) {
  const entities = await query(entityType)
  const entityToUpdate = { ...newEntity }
  const idx = entities.findIndex((entity) => entity._id === entityToUpdate._id)
  if (idx === -1) {
    throw new Error(
      `Could not update entityId: [${newEntity._id}] in collection :[${entityType}]`,
    )
  }
  const newEntities = entities.map((originalEntity, i) =>
    i === idx ? entityToUpdate : originalEntity,
  )
  _save(entityType, newEntities)
  return entityToUpdate
}

async function remove(entityType, entityId) {
  const entities = await query(entityType)
  const idx = entities.findIndex((entity) => entity.id === entityId)
  if (idx === -1) {
    throw new Error(
      `Could not remove entityId: [${entityId}] from collection :[${entityType}]`,
    )
  }
  const newEntities = entities.filter((entity) => entity._id !== entityId)
  _save(entityType, newEntities)
  return entityId
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}
