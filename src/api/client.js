import axios from "axios";

const client = axios.create(); //axios를 만든다.

export default client;

//axios의 역할을 함 매번 axios의 import 하지 않아도 됨
