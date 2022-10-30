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

const client = new UserService(
  'localhost:5000',
  grpc.credentials.createInsecure(),
);

client.GetUser({}, (error, user) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(user);
});
