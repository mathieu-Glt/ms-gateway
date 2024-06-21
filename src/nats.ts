// import { connect, NatsConnectionOptions, Client, Msg, NatsError  } from 'ts-nats';
import { connect, StringCodec, JSONCodec, NatsConnection } from "nats"
// import { nanoid } from "nanoid";
import { v4 as uuidv4 } from 'uuid';



export default class NatsService {
    async send(command: string, data?: any): Promise<any> {
        try {
            const connection = await this.__startServiceNats();
            const payload = this.setPayload(data);
            const message = await connection.request(
                command,
                JSONCodec().encode(payload)
            );
            const response: any = JSONCodec().decode(message.data)
            console.log("🚀 ~ NatsService ~ send ~ response:", response)
            return response.response
        } catch (error) {
            throw new Error(`MESSAGING-ERROR: ${error.message}`);
        }
    }

    async ping() {
        const connection = await this.__startServiceNats();
        const message = await connection.request(
          "ping"
        );
        const response: any = JSONCodec().decode(message.data);
        return response.response;
      }



    private setPayload(data?: any) {
        return {
          id: uuidv4(),
          data,
        };
      }


    private async __startServiceNats(): Promise<NatsConnection> {
        try {
            return await connect({
                // servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
                servers: [`nats://localhost:4222`],
            });
        } catch (error: any) {
            console.log("🚀 ~ NatsService ~ __startServiceNats ~ error:", error)
            throw new Error(`MESSAGING-ERROR: ${error.message}`);
            
        }
    }

}


