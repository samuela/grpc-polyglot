const messages = require('./pingpong_pb')
const services = require('./pingpong_grpc_pb')
const grpc = require('grpc')

function play (call, callback) {
  const reply = new messages.PlayReply()
  reply.setCount(call.request.getCount() + 1)
  callback(null, reply)
}

function main () {
  const server = new grpc.Server()
  server.addService(services.PingPongPlayerService, { play })
  const port = '0.0.0.0:50051'
  server.bind(port, grpc.ServerCredentials.createInsecure())
  console.log(`Starting server on ${port}...`)
  server.start()
}

main()
