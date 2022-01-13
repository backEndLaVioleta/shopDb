export default () => ({
  database: {
    type: 'mongodb',
    url: process.env.MONGODB_CONNECTION_STRING,
    port: process.env.PORT,
    database: process.env.MONGODB_DATABASE || 'backShop',
    entities: ['dist/**/entities/*.entity.js'],
    ssl: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    synchronize: true,
  },
});
