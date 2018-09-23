const path = require('path')
const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = path.join(__dirname, '/../protos/pingpong.proto')
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
const protoDef = grpc.loadPackageDefinition(packageDefinition).pingpong

function Play (call, callback) {
  callback(null, { count: call.request.count + 1 })
}

function main () {
  const server = new grpc.Server()
  server.addService(protoDef.PingPongPlayer.service, { Play })
  const port = '0.0.0.0:50051'
  server.bind(port, grpc.ServerCredentials.createInsecure())
  console.log(`Starting server on ${port}...`)
  server.start()
}

main()
