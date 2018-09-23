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

function main () {
  const client = new protoDef.PingPongPlayer(
    'localhost:50051',
    grpc.credentials.createInsecure())
  client.Play({ count: 3 }, function (err, response) {
    if (err) {
      console.error(err)
    } else {
      console.log(response.count)
    }
  })
}

main()
