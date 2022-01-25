const houses = require('./db.json')
const idCounter = 4


module.exports = {
getHouses:(req, res) =>{
  res.status(200).send(houses)
},
deleteHouse:(req, res) =>{
  let {id} = req.params
  let index = houses.findIndex(houseEl => +houseEl.id === +id)
  houses.splice(index,1)
  res.status(200).send(houses)
},
createHouse:(req, res) =>{
  const {address, price, imageURL}= req.body
  let newHouse = {
    id : idCounter,
    address : address,
    price : price,
    imageURL : imageURL
  }
  houses.push(newHouse)
  res.status(200).send(houses)
  idCounter++
},
updateHouse:(req, res) =>{
  let {id} = req.params
  let {type} = req.body
  let index = houses.findIndex(houses => +houses.id === +id)

  if(houses[index].price === 10000 && type === 'minus'){
    res.status(400).send('Cannot go below 10000')
  } else if(type === 'plus'){
    houses[index].price+=10000
    res.status(200).send(houses)
  }else if(type === 'minus'){
    houses[index].price-= 10000
    res.status(200).send(houses)
  }else {
    res.sendStatus(400)
  }
}
}