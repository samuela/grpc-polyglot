const messages = require('./helloworld_pb')
const services = require('./helloworld_grpc_pb')
const grpc = require('grpc')

function Play (call, callback) {
  const reply = new messages.HelloReply()
  reply.setMessage('Hello ' + call.request.getName())
  callback(null, reply)
}

function main () {
  const server = new grpc.Server()
  server.addService(services.PingPongPlayerService, { Play })
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.start()
}

main()
