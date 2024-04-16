export interface IResponse {
  statusCode: number;
  isExitoso: boolean;
  errorsMessage: string[];
  resultado: any;
}
