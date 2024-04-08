// mongodb연결 정보
import { MongoClient } from 'mongodb'
const url = 'mongodb+srv://psj156100:1234@psj1561.fsdry0p.mongodb.net/?retryWrites=true&w=majority&appName=psj1561'
const options = {}
let connectDB

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export default { connectDB }