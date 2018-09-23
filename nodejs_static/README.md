# Node.js with static code generation

```
npm rebuild
node_modules/.bin/grpc_tools_node_protoc --js_out=import_style=commonjs,binary:. --grpc_out=. --plugin=protoc-gen-grpc=node_modules/.bin/grpc_tools_node_protoc_plugin -I=../protos/ ../protos/*
```
