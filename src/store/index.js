import Vue from 'vue';
import Vuex from 'vuex';
import storage from "@/storage"
import session from "@/session"

Vue.use(Vuex);
const state = { //要设置的全局访问的state对象,赋予初始属性值
    user: {},
    admin: {
        id: "0",
        name: "Genius淼",
        password: "739416541",
        order: "",
        msg: {
            name: "Genius淼",
            headImg: "man",
            age: "23",
            sex: "0",
            sign: "我是管理员哦~",
            tags: ["管理员"]
        }
    },
    adminList: [],
    userList: [],
    theme: "" // light / dark
};
const getters = {   //实时监听state值的变化(最新状态)
    getUser(state) {  //定义函数，返回处理过的val，命名最好有代表性
        state.user = session.get('user') || {}
        return state.user
    },
    getUserList(state) {
        state.userList = storage.get("userList")
        return state.userList
    },
    getTheme(state) {
        let hour = new Date().getHours();
        state.theme = 6 <= hour && hour <= 18 ? 'ight' : 'dark';
        return state.theme
    }
};
const mutations = {
    //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    setUser(state,user) {
        session.set('user', user)
    },
    setUserList(state) {
        // 修改对应的user （此时userList里面一定有user）
        state.userList.forEach((user, i) => {
            if (user.id+"" == state.user.id+"") {
                state.userList[i] = state.user
                console.log("..............",state.userList)
            }
        })
        storage.set('userList', state.userList)
    },
    setThemeColor(state, color, opacity) {
        state.themeColor.val = color;
        state.themeColor.opacity = opacity;
        state.changeThemeCount++;
    }
};
const actions = {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    init({ state, commit }) {
        state.user = session.get('user')
        state.userList = storage.get("userList")
        // commit('setUserList')
        console.log("执行仓库初始化",state.userList)
    }
};
const store = new Vuex.Store({
    state, // 挂载存取数据功能
    getters, //挂载数据计算功能
    mutations, // 挂载函数功能
    actions // 挂载异步函数
});
export default store;