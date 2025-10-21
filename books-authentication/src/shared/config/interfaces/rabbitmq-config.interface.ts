export interface IRabbitMQConfig {
  port: number;
  host: string;
  user: string;
  password: string;
  usersQueue: string;
  durable: boolean;
}
