import { QueryInterface } from 'sequelize';
export async function truncateTable(
  queryInterface: QueryInterface,
  tableName: string,
) {
  await queryInterface.sequelize.query(
    `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`,
  );
}
export async function clearDB(queryInterface: QueryInterface) {
  return [
    'users',
    'vendors',
    'trips',
    'orders',
    'late_deliveries',
    'delay_reports',
  ].map((tableName) => truncateTable(queryInterface, tableName));
}
