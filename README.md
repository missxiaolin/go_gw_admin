# admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

### 使用cnpm 国内源

~~~
npm install -g cnpm
cnpm install
~~~

### nginx 配置

~~~
server {
    listen       80;
    server_name  xxxxxx;

    root   xxxxxx;
    gzip on;
    gzip_static on;
    gzip_min_length 1k;
    gzip_buffers 16 64k;
    gzip_http_version 1.1;
    gzip_comp_level 9;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    
    location / {
        index  index.html index.htm;
        try_files $uri $uri/ /index.html$is_args$args;
    }
}
~~~

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# vue-admin

```
build/						配置文件
config/						配置文件
dist						打包目录
src							
	api						api
	assets					资源文件
	common					资源文件
			css
			font
			image
			js
	components				view
	route					路由
	store					vuex配置
static
test
```

### vue各种自定义组件库

- [组件提取库](https://github.com/missxiaolin/vue-assembly)
- [组件](https://github.com/missxiaolin/vue-admin-base)
