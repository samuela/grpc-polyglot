open Pingpong
open System.Threading.Tasks
open System

type PingPongPlayerImpl() =
    inherit PingPongPlayer.PingPongPlayerBase()

    override this.Play(request, context) =
        Task.FromResult(new PlayReply(Count = request.Count + 1))

let runService service port =
    let serverPort =
        new Grpc.Core.ServerPort(
            "localhost", port, Grpc.Core.ServerCredentials.Insecure)
    let server = new Grpc.Core.Server()
    server.Services.Add(service)
    server.Ports.Add(serverPort) |> ignore
    server.Start()
    Console.ReadKey() |> ignore
    server.ShutdownAsync().Wait()

[<EntryPoint>]
let main argv =
    let port = 50051
    let service = PingPongPlayer.BindService(new PingPongPlayerImpl())
    printfn "Server listening on port %i" port
    printfn "Press any key to quit..."
    runService service port
    0 // return an integer exit code
