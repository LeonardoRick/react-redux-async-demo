# react-redux-async-demo

More complex redux implementation with async calls related to it. The program use a json-server to mock a backend api
![image](https://user-images.githubusercontent.com/17517057/180761058-ed65be5e-53e4-4a6e-bcc7-de1fd5069f4e.png)

You will see that fetch calls are maded without an endpoint. This is possible because we settle up a proxy on package.json
  "proxy": "http://localhost:8080"
