const fs = require('fs')
let storage = {}

let isKey = key =>{
  if(typeof key !== 'string'){
    throw new Error('This key is not a string => ' + key)
  }
}

let keyExists = key =>{
  if(!storage.hasOwnProperty(key)){
    throw new Error('This key is not a string => ' + key)
  }
}

let getAll = () =>{
  if(Object.keys(storage).length === 0){
    return 'There are no items in the storage'
  }
  return storage
}

let put = (key,value)=>{
  isKey(key)
  if(storage.hasOwnProperty(key)){
    throw new Error('Key already exists => ' + key)
    return
  }
  storage[key] = value;
}

let get = key =>{
  isKey(key)
  keyExists(key)
  return storage[key]
}

let update = (key,value) =>{
  isKey(key)
  keyExists(key)
  storage[key] = value
}

let deleteItem = key =>{
  isKey(key)
  keyExists(key)
  delete storage[key]
}

let clear = () =>{
  storage = {}
}

let save = () =>{
  fs.writeFileSync('./data.json', JSON.stringify(storage),'utf8')
}

let load = () => {
  try{
    storage = JSON.parse(fs.readFileSync('./data.json','utf8'))
  }catch (err){

  }finally {

  }
}

module.exports={
  put:put,
  get:get,
  getAll:getAll,
  update:update,
  delete:deleteItem,
  clear:clear,
  save:save,
  load:load
}