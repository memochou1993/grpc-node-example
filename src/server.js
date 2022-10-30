const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_FILE = './service.proto';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_FILE, options);

const { UserService } = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(UserService.service, {
  GetUser: (input, callback) => {
    try {
      callback(null, { name: 'Memo Chou', age: 18 });
    } catch (error) {
      callback(error, null);
    }
  },
});

server.bindAsync('localhost:5000', grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.log(error);
    return;
  }
  server.start();
});
