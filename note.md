# NOTE



## shard问题报错

**错误信息**: `Uncaught Error: Shared module is not available for eager consumption`

**解决方法如下**:

- 方法一:  将报错模块的代码放到一个单独的文件例如:`init.js`中, 在主入口中使用`import('./init.js')`进行异步加载

  ```js
  // bootstrap.js
  import _ from "lodash";
  console.log(_.add(1, 2));
  
  (async () => {
    const { sayHello } = await import("RemoteApp/utils");
    sayHello();
  })();
  
  console.log("Hello");
  
  // main.js
  import("./bootstrap");
  
  ```

  

- ```js
  // 方法二
  new ModuleFederationPlugin({
      // .....
      shared:{
          [module]:{
              eager:true
          }
      }
  }),
  ```

  

https://webpack.js.org/concepts/module-federation/#uncaught-error-shared-module-is-not-available-for-eager-consumption



