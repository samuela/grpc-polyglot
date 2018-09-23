"""Example Python gRPC client."""
import grpc

import pingpong_pb2
import pingpong_pb2_grpc

def run():
  with grpc.insecure_channel('localhost:50051') as channel:
    stub = pingpong_pb2_grpc.PingPongPlayerStub(channel)
    response = stub.Play(pingpong_pb2.PlayRequest(count=3))
  print('Client received: {}'.format(response.count))

if __name__ == '__main__':
  run()
