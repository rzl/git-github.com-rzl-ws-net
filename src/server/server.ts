import { RawData, WebSocket, WebSocketServer } from "ws"

interface I_config {
    /**
     * websocket绑定的路径
     */
    path?: string,
    /**
     * client连接时校验的密钥
     */
    password?: string,
    /**
     * 获取WsNetServer活动信息的密钥
     */
    infoPassword?: string
}

/**
 * 
 */
interface I_websocket extends WebSocket {
    wns: {
        group: string,
        name: string,
        isAlive: boolean,
    }
}

/**
 * 消息通信协议
 */
interface I_message {
    key: string;
    action: string;
    payload: any;
    isCb: boolean;
    res: {
      code: number;
      result: any;
    };
}

export class WsNetServer {
    config = <I_config>{
        path: '',
        password: 'wspass',
        infoPassword: 'infopass'
    }
    /**
     * 客户端服连接池,客户端连接时需要发送分组及客户端名称等信息
     */
    clients: {
        [group: string]: [I_websocket]
    }
    constructor(config?: I_config | undefined) {
        if (config) {
            Object.assign(this.config, config)
        }
    }
    getClientsInfo() {

    }
    bindWSS(wss: WebSocketServer) {
        wss.on('connection', (ws: WebSocket) => {
            this.handleConnection(ws as I_websocket)

        });
    }
    handleConnection(ws: I_websocket) {
        
        ws.on('error', console.error);

        ws.on('message', (data: RawData) => {
            let _data = JSON.parse(data.toString())
            this.handleMessage(_data)
        });
        ws.on('ping', this.heartbeat)
    }
    heartbeat(ws: I_websocket) {
        ws.isAlive = true;
    }
    handleMessage(msg: I_message) {

    }
    bindExpress() {

    }
}