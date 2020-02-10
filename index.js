'use strict'

async function override(blueprint, overrideData) {
  const notOverridenKeys = Object.keys(blueprint).filter(key => !overrideData.hasOwnProperty(key))

  const newBlueprint = {...overrideData}
  for (const key of notOverridenKeys) {
    if (typeof blueprint[key] === 'function') {
      const value = await blueprint[key]()
      newBlueprint[key] = typeof value === 'object' ? value.id : value
    } else {
      newBlueprint[key] = blueprint[key] 
    }
  }

  return newBlueprint
}

module.exports = override
