import * as grpc from "grpc";
import * as pingpong_grpc_pb from "./__proto__/pingpong_grpc_pb";
import * as pingpong_pb from "./__proto__/pingpong_pb";

class PingPongPlayerImpl implements pingpong_grpc_pb.IPingPongPlayerServer {
  public play(
      call: grpc.ServerUnaryCall<pingpong_pb.PlayRequest>,
      callback: grpc.sendUnaryData<pingpong_pb.PlayReply>) {
    const resp = new pingpong_pb.PlayReply();
    resp.setCount(call.request.getCount() + 1);
    callback(null, resp);
  }
}

function run() {
  const server = new grpc.Server();
  server.addService(
    pingpong_grpc_pb.PingPongPlayerService,
    new PingPongPlayerImpl());
  const port = "0.0.0.0:50051";
  server.bind(port, grpc.ServerCredentials.createInsecure());
  console.log(`Starting server on ${port}...`); // tslint:disable-line no-console
  server.start();
}

run();
