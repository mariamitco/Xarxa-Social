import { QueryResult } from "pg";
import { PostgreSqlConnectionPool as pool } from "../../../shared/domain/services/PostgreSqlConnectionPool";
import { ErrorMessages, HandledError } from "../../../shared/domain/models/HandledError";
import { LoginRepository } from "../../domain/repositories/LoginRepository";
import { UserDTO } from "../models/UserDTO";
import { UserDTOBuilder } from "../models/UserDTOBuilder";

export default class LoginRepositoryPostgreSQL implements LoginRepository {
  public async getLogin(email: string, password: string): Promise<UserDTO | undefined> {
    try {
      return this.toDao(await pool.query("SELECT * FROM users WHERE u_email = $1 AND u_password = $2", [email, password]));
    } catch (e) {
      throw new HandledError(ErrorMessages.DBError, (e as Error).message, 500);
    }
  }

  private toDao(rs: QueryResult<any>): UserDTO | undefined {
    if (rs.rowCount == 0) return undefined;

    return new UserDTOBuilder()
      .id(rs.rows[0]["u_id"])
      .token("token")
      .uuid(rs.rows[0]["u_code"])
      .email(rs.rows[0]["u_email"])
      .username(rs.rows[0]["u_username"])
      .password(rs.rows[0]["u_password"])
      .registrationTimestamp(rs.rows[0]["u_register_timestamp"])
      .lastAccesTimestamp(rs.rows[0]["u_last_access_timestamp"])
      .banned(rs.rows[0]["u_banned"])
      .role(rs.rows[0]["u_role"])
      .build();
  }
}
