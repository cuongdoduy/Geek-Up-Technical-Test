import { ResponseType } from './common.type'
export class ResponseHandler {
  static success(data: any, message: string): ResponseType {
    return {
      success: true,
      message,
      data,
    }
  }

  static error<T>(message: string): ResponseType {
    return {
      success: false,
      message,
      data: null,
    }
  }
}
