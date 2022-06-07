import { combineReducers } from "redux";
import postList from "./postlist";
import auth from "../modules/auth";
import loading from "./loading";
import user from "./user";
import write from "./write";
import post from "./post";

const rootReducer = combineReducers({
    auth, 
    loading, 
    user,
    write, 
    post, 
    postList ,
});

export default rootReducer;
