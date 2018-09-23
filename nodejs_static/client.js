const messages = require('./pingpong_pb')
const services = require('./pingpong_grpc_pb')

const grpc = require('grpc')

function main () {
  const client = new services.PingPongPlayerClient(
    'localhost:50051',
    grpc.credentials.createInsecure())

  const request = new messages.PlayRequest()
  request.setCount(3)

  client.play(request, function (err, response) {
    if (err) {
      console.error(err)
    } else {
      console.log(response.getCount())
    }
  })
}

main()
