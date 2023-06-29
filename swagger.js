import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routers/user', './src/routers/auth', './src/routers/product']; // Thay đổi đường dẫn tới file chứa các định nghĩa route của bạn

swaggerAutogen(outputFile, endpointsFiles);
