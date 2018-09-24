using System;
using System.Threading.Tasks;
using Pingpong;

namespace csharp
{
    class PingPongPlayerImpl : PingPongPlayer.PingPongPlayerBase
    {
        public override Task<PlayReply> Play(PlayRequest request, Grpc.Core.ServerCallContext context)
        {
            return Task.FromResult(new PlayReply { Count = request.Count + 1 });
        }
    }

    class Server
    {
        const int Port = 50051;

        static void Main(string[] args)
        {
            Grpc.Core.Server server = new Grpc.Core.Server
            {
                Services = { PingPongPlayer.BindService(new PingPongPlayerImpl()) },
                Ports = { new Grpc.Core.ServerPort("localhost", Port, Grpc.Core.ServerCredentials.Insecure) }
            };
            server.Start();
            Console.WriteLine("Server listening on port " + Port);
            Console.WriteLine("Press any key to quit...");
            Console.ReadKey();
            server.ShutdownAsync().Wait();
        }
    }
}
