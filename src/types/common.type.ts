export type FindAllResponse<T> = { count: number; items: T[] }

export type ResponseType = {
  success: boolean
  message: string
  data: any
}
