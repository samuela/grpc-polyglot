open Grpc.Core
open Pingpong

[<EntryPoint>]
let main argv =
    let channel = new Channel("localhost:50051", ChannelCredentials.Insecure)
    let client = new PingPongPlayer.PingPongPlayerClient(channel)
    let reply = client.Play(new PlayRequest(Count=3))
    printfn "%i" reply.Count
    0 // return an integer exit code
