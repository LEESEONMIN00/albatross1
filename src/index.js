import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { tempSetUser, check } from "./modules/user";
import {HelmetProvider} from "react-helmet-async";


//createStore는 단 한곳에만 존재 전체 리덕스를 저장하는 곳
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
//로그인 상태가 보존 될 수 있도록 랜더 하자마자 만들어 두어야 함
function loadUser() {
  try {
    const user = localStorage.getItem("user");
    if (!user) return;

    //스토어에 바로 접속할 수 있게 함
    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check()); //실제 db에서 가져오고 하는 역할
  } catch (error) {
    console.log("로컬스토리지 에러");
  }
}
loadUser(); //랜더하기 전에 실행
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <HelmetProvider>
      <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>
);
