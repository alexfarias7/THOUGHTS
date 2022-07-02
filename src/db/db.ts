import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';

const dbName = process.env.DATABASE_NAME as string;
const dbUser = process.env.DATABASE_USER as string;
const dbHost = process.env.DATABASE_HOST as string;
const dbPassword = process.env.DATABASE_PASSWORD as string;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
} catch (error) {
  console.log(`não foi possivel conectar:${error}`);
}

export default sequelize;
