const UserRepository = require('./data/UserRepository')
const User = require('./domain/User')
const hash = require('./lib/hasher')

const db = new UserRepository()

function findById (id) {
  const user = db.findById(id)
  if (!user) return null
  return user
}

function create (name, email, password) {
  if (findById(hash(email))) throw new Error(`User with email ${email} already exists`)
  const user = User.create({ name, email, password })
  db.save(user)
  return user
}

function remove (id) {
  const user = findById(id)
  if (!user) return null
  user.delete()
  db.save(user)
  return user
}

function update (name, password) {
  const user = findById(hash(name))
  if (!user) return null
  user.update({ name, password })
  db.save(user)
  return user
}

let john = findById(hash('lsantos.dev'))
if (!john) john = create('John', 'lsantos.dev', '123')
console.log(john.events)
const lucas = john.update({ name: 'Lucas' })
console.log(lucas.events)
