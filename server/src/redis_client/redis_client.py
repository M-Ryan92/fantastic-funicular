import redis


class RedisClient:
    redis_client: object

    def __init__(self, config):
        self.redis_client = redis.Redis(
            host=config.host, port=config.port, decode_responses=True
        )

    def sadd(self, key: str, value: str):
        self.redis_client.sadd(key, value)

    def flushdb(self):
        """
        de carefull with this one it resets the db
        """
        self.redis_client.flushdb()

    def smembers(self, key: str):
        """
        returns the set of members for a key
        """
        return self.redis_client.smembers(key)

    def sismember(self, key: str, value: str):
        """
        this function returns 0 or 1
        when it return 0 the value is not a member
        whereas 1 means it is a member
        """
        return self.redis_client.sismember(key, value)
