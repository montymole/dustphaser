local redis = require "resty.redis"
local red = redis:new()

red:set_timeout(1000)

local ok, err = red:connect("127.0.0.1", 6379)

if not ok then
	ngx.log(ngx.NOTICE, "failed to connect: ", err)
	ngx.exit(ngx.HTTP_NOT_FOUND)
	return
end

local res, err = red:get(ngx.var.uri)
if not res then
    ngx.log(ngx.NOTICE, "failed to get ", ngx.var.uri, err)
    ngx.exit(ngx.HTTP_NOT_FOUND)
    return
end

if res == ngx.null then
    ngx.log(ngx.NOTICE, ngx.var.uri, " not found.")
    ngx.exit(ngx.HTTP_NOT_FOUND)
    return
end

local ok, err = red:set_keepalive(10000, 100)
if not ok then
    ngx.log(ngx.NOTICE, "failed to set keepalive: ", err)
end

ngx.say(res)
ngx.exit(ngx.OK)



