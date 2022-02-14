const db = require('../data/dbconfig.js');

async function getAll(){
  return db('accounts');
}

async function getById(id){
  return db('accounts').where({ id:  id });
}

async function create({name, budget}) {
  let [id] = await db('accounts').insert({ name, budget });	
  return {
    name,
    budget,
    id: id
  };
}

async function updateById(id, {name, budget}){
  await db('accounts').where({ id: id }).update({ name, budget });
  return {
    name,
    budget,
    id
  }
}

async function deleteById(id){
  let result = await getById(id);
  await db('accounts').where({id: id}).del();
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
