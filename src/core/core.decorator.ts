import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {PAYLOAD} from './core.constant';
import {getRequestPart} from './core.util';

export const Payload = createParamDecorator((data: never, context: ExecutionContext) => getRequestPart(context, PAYLOAD));
