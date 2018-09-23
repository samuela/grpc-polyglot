import * as grpc from "grpc";
import * as pingpong_grpc_pb from "./__proto__/pingpong_grpc_pb";
import * as pingpong_pb from "./__proto__/pingpong_pb";

function main() {
  const client = new pingpong_grpc_pb.PingPongPlayerClient(
    "localhost:50051",
    grpc.credentials.createInsecure());

  const request = new pingpong_pb.PlayRequest();
  request.setCount(3);

  client.play(request, (err, response) => {
    if (err) {
      console.error(err); // tslint:disable-line no-console
    } else {
      console.log(response.getCount()); // tslint:disable-line no-console
    }
  });
}

main();
