#!/usr/bin/env bash

PLATFORM=macosx_x64
TOOLS_DIR=$HOME/.nuget/packages/grpc.tools/1.15.0/tools/$PLATFORM
$TOOLS_DIR/protoc \
    --plugin=protoc-gen-grpc=$TOOLS_DIR/grpc_csharp_plugin \
    --csharp_out src/__proto__ \
    --grpc_out src/__proto__ \
    -I../protos \
    ../protos/*.proto
