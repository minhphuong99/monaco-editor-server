/**
 * 
 * @param {Object} data 
 * @param {Array} fields 
 */
const isExist = (data, fields) => {
  for (const field of fields) {
    if (!data.hasOwnProperty(field) || !data[field] || (typeof data[field] === 'string' && data[field].trim() === "")) {
      throw new Error(`500:Missing parameter '${field}'`)
    }
  }
}

module.exports = {
  isExist
}