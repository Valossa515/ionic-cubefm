import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";
import { JwtHelper } from 'angular2-jwt';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(public http: HttpClient, public storage: StorageService) {

    }
    authenticated(cred: CredenciaisDTO) {
       return this.http.post(`${API_CONFIG.baseUrl}/login`, 
        cred,
        {
            observe: 'response',
            responseType: 'text'
        });
    }
    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, 
         {},
         {
             observe: 'response',
             responseType: 'text'
         });
     }

    successfulLogin(authorizationValue : string)
    {
        let tok = authorizationValue.substring(7)
        let user: LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub,
            roles: jwt_decode(tok)
        };
        this.storage.setLocalUser(user);
    }

    logout()
    {
        this.storage.setLocalUser(null);
    }    
}