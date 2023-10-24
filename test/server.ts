import { WebSocketServer } from 'ws';
import { WsNetServer } from '../src/server/server';

const wss = new WebSocketServer({ port: 8080 });


const wns = new WsNetServer()
wns.bindWSS(wss)

