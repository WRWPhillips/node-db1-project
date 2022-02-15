const db = require('../../data/db-config');

function getAll(){
  return db('accounts')
    .select('id', 'name', 'budget');
}

const getById = (id) => {
  return db('accounts'
  ).where( 'id', id 
  ).first();
}

async function create(account) {
  let [id] = await db('accounts').insert(account);	
  return getById(id);
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
