import { Injectable } from '@angular/core';
import { HttpTransactionsService } from 'src/app/services/http-transactions/http-transactions.service';
import { Config } from 'src/app/configs/config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http_client: HttpTransactionsService,
    private config: Config
  ) { }

  auth_user_token(callback): void {
    this.http_client.get_login_token.sendRequest().subscribe(
      (data) => {
        return callback(null, data.token);
      },
      (error) => {
        return callback(error);
      }
    );
  }

  get_access(user_id: string, callback): void {
    this.http_client.get_profile_user_id.sendRequest(user_id).subscribe(
      (data) => {
        for (let global_app of this.config.global_apps) {
          data.data.app_permissions.push({
            app: global_app.app.identifier,
            permissions: global_app.permissions,
            _id: 'client_grown'
          });
        }

        console.log(data);

        return callback(null, {
          access: data.data.app_permissions,
          token: data.token
        });
      },
      (error) => {
        return callback(error);
      }
    );
  }
}
