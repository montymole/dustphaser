echo "RELOADING RESTY...	"
PATH=/usr/local/openresty/nginx/sbin:$PATH
export PATH
nginx -v
nginx -s stop -p `pwd`/ -c conf/nginx.conf
nginx -p `pwd`/ -c conf/nginx.conf

