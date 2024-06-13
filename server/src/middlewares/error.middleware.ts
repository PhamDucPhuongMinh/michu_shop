import { NextFunction, Response, Request } from 'express'
import { StatusCodes } from 'http-status-codes'
import env from '~/config/environment'

export const errorHandlingMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Default status code 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode], // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
    stack: err.stack
  }

  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // Đoạn này có thể mở rộng nhiều về sau như ghi Error Log vào file, bắn thông báo lỗi vào group Slack, Telegram, Email...vv Hoặc có thể viết riêng Code ra một file Middleware khác tùy dự án.
  // ...
  // console.error(responseError)

  // Return responseError to Front-End
  res.status(responseError.statusCode).json(responseError)
}
