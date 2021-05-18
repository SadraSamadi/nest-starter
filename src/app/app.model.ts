import {IntersectionType} from '@nestjs/mapped-types';
import {AuthConfig} from '../auth/auth.model';
import {CoreConfig} from '../core/core.model';

export class AppConfig extends IntersectionType(CoreConfig, AuthConfig) {

}
