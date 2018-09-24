using System;
using Grpc.Core;
using Pingpong;

namespace csharp
{
    public class Client
    {
        static void Main(string[] args) {
            Channel channel = new Channel("localhost:50051", ChannelCredentials.Insecure);
            var client = new PingPongPlayer.PingPongPlayerClient(channel);
            var reply = client.Play(new PlayRequest { Count = 3 });
            Console.WriteLine(reply.Count);
            channel.ShutdownAsync().Wait();
        }
    }
}
