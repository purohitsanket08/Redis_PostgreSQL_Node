import { createClient } from 'redis';

class RedisCache {
    constructor() {
        this.client = createClient({
            url: 'redis://172.17.0.5:6379'
        });
        
        this.client.connect().then(() => {
            console.log("Connected to Redis");
        }).catch((err) => {
            console.error("Error connecting to Redis", err);
        });
    }

    async checkRedis(key) {
        try {
            const data = await this.client.get(key);
            return data;
        } catch (err) {
            throw new Error('Error retrieving data from Redis');
        }
    }
  
    async saveToRedis(key, data) {
        try {
            const drata = await this.client.set(key,JSON.stringify(data));
            return true;
        } catch (err) {
            throw new Error('Error retrieving data from Redis');
        }
    }

    async updateKeyData(key, newValue) {
        try {
            await this.client.del(key);
            console.log(`Key '${key}' deleted`);

            const result = await this.client.set(key, JSON.stringify(newValue));
            return result;
        } catch (err) {
            throw new Error('Error deleting and creating key in Redis');
        }
    }
}

export default RedisCache;
