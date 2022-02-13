const db = require('../data/dbconfig.js');

const getAll = () => {
  return db(table);
}

const getById = id => {
  return db(table).where({ id: id });
}

const create = account => {
  db(table).insert({
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
