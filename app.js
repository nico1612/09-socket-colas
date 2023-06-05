import * as dotenv from 'dotenv'

import { ServerClass } from './models/server.js'

dotenv.config()

const server = new ServerClass();

server.listen();