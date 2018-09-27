#!/usr/bin/env bash

python -m grpc_tools.protoc -I../protos --python_out=. --grpc_python_out=. --mypy_out=. ../protos/*.proto
