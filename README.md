# route core
## dust + model
## openresty + redis + iojs

# example project

## phaser.io
## with gulp build

## installation instructions

coming up

### open resty

PATH=/usr/local/openresty/nginx/sbin:$PATH
export PATH


	launchctl load /projects/jrn/dev/resty.plist
	launchctl unload /projects/jrn/dev/resty.plist


nginx -v
nginx version: openresty/1.7.10.1
nginx -p `pwd`/ -c conf/nginx.conf

### REdis:

To have launchd start redis at login:
    ln -sfv /usr/local/opt/redis/*.plist ~/Library/LaunchAgents

Then to load redis now:
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

Or, if you don't want/need launchctl, you can just run:
    redis-server /usr/local/etc/redis.conf

### nvm + iojs

