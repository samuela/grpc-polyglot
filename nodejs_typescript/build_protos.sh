#!/usr/bin/env bash

# The grpc_tools_node_protoc_ts package magically makes the _grpc_pb.d.ts
# generation work. See https://github.com/agreatfool/grpc_tools_node_protoc_ts/blob/master/examples/bash/build.sh

npm rebuild
mkdir -p ./__proto__
node_modules/.bin/grpc_tools_node_protoc \
    --js_out="import_style=commonjs,binary:./__proto__" \
    --grpc_out="./__proto__" \
    --plugin="protoc-gen-grpc=node_modules/.bin/grpc_tools_node_protoc_plugin" \
    -I="../protos/" \
    ../protos/*
node_modules/.bin/grpc_tools_node_protoc \
    --plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts" \
    --ts_out="./__proto__" \
    -I="../protos/" \
    ../protos/*
