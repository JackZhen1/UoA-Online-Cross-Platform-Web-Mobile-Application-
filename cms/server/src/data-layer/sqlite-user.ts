import db from "./sqlite-demo";

import {IUser} from "../data-layer/models/models"
import {PaginatedUserResponse} from "../service-layer/response-models/UserResponse"



export function getPaginatedUsers(limit = 10, page = 1): PaginatedUserResponse {
  const offset = (page - 1) * limit;

  const users = db
    .prepare("SELECT * FROM users LIMIT ? OFFSET ?")
    .all(limit, offset) as IUser[];

  const total = (db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number }).count;

  return {
    users,
    total,
    page,
    limit,
  };
}
