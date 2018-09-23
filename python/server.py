"""Python gRPC server."""
from concurrent import futures
import time

import grpc

import pingpong_pb2
import pingpong_pb2_grpc

_ONE_DAY_IN_SECONDS = 60 * 60 * 24

class Player(pingpong_pb2_grpc.PingPongPlayerServicer):
  def Play(
      self,
      request: pingpong_pb2.PlayRequest,
      context
  ) -> pingpong_pb2.PlayReply:
    return pingpong_pb2.PlayReply(count=request.count + 1)

def main():
  server = grpc.server(futures.ThreadPoolExecutor())
  pingpong_pb2_grpc.add_PingPongPlayerServicer_to_server(Player(), server)
  server.add_insecure_port('[::]:50051')
  server.start()
  try:
    while True:
      time.sleep(_ONE_DAY_IN_SECONDS)
  except KeyboardInterrupt:
    server.stop(0)

if __name__ == '__main__':
  main()
