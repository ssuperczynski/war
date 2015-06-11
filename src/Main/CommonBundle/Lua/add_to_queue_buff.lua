--[[
core of the couter
1. from frontentd (angular) you can click many times button which adding soldiers to queue
2. it adds to queue (this script)
3. symfony2 command works all the time with 1 sec interval
4. when you adding something to this queue save:
	- added time (if key exists leave old time, if not add new one)
	- incremented amount
	- what (range)
	- user (as a key)
5. symfony2 command every second checks queues KEYS and calculate now time minus added time
6. if (diff % soldier_interval) == 0, add soldier to trained queue
6a. else wait second
7. consumer when runs increment solderis queue, decr this queue
8. consumer iterate each second through all hashkeys
]]
local incr_by = redis.call("HINCRBY", KEYS[1], 'amount', ARGV[1])
local time_exists = redis.call("HEXISTS", KEYS[1], 'time')
if time_exists == 1 then
    return redis.call('HMSET', KEYS[1], 'amount', incr_by)
else
    return redis.call('HMSET', KEYS[1], 'amount', incr_by, 'time', ARGV[2])
end