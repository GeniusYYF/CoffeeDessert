import Vue from 'vue';
import Vuex from 'vuex';
import storage from "@/storage"
import session from "@/session"

Vue.use(Vuex);
const state = { //要设置的全局访问的state对象,赋予初始属性值
    user: {},
    admin: {},
    adminList: [],
    userList: [],
    speaks: [],
    theme: "" // light / dark
};
const getters = {   //实时监听state值的变化(最新状态)
    getUser(state) {
        state.user = session.get('user')
        return state.user
    },
    getUserList(state) {
        state.userList = storage.get("userList")
        return state.userList
    },
    getAdmin(state) {  //定义函数，返回处理过的val，命名最好有代表性
        state.admin = session.get('admin')
        return state.admin
    },
    getAdminList(state) {
        state.adminList = storage.get("adminList")
        return state.adminList
    },
    getSpeaks(state) {
        state.speaks = storage.get("speaks")
        return state.speaks
    },
    getTheme(state) {
        let hour = new Date().getHours();
        state.theme = 6 <= hour && hour <= 18 ? 'ight' : 'dark';
        return state.theme
    }
};
const mutations = {
    //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    setUser(state, user) {
        session.set('user', user)
    },
    setUserList(state) {
        // 修改对应的user （此时userList里面一定有user）
        state.userList.forEach((user, i) => {
            if (user.id + "" == state.user.id + "") {
                state.userList[i] = state.user
            }
        })
        storage.set('userList', state.userList)
    },
    setAdminList(state) {
        // 修改对应的admin （此时adminList里面一定有admin）
        state.adminList.forEach((admin, i) => {
            if (admin.id + "" == state.admin.id + "") {
                state.adminList[i] = state.admin
            }
        })
        storage.set('userList', state.userList)
    },
    setSpeaks(state) {
        console.log("更新新增的说说")
        state.speaks = []
        // 修改对应的user （此时userList里面一定有user）
        state.userList.forEach((user, i) => {
            if (user.speaks.length != 0) {
                user.speaks.forEach(s => {
                    state.speaks.push(s)
                })
            }
        })
        state.adminList.forEach((admin, i) => {
            if (admin.speaks.length != 0) {
                admin.speaks.forEach(s => {
                    state.speaks.push(s)
                })
            }
        })
        // 按照stamp降序
        state.speaks.sort((a, b) => {
            return b.stamp - a.stamp;
        })
        storage.set('speaks', state.speaks)
    },
    setThemeColor(state, color, opacity) {
        state.themeColor.val = color;
        state.themeColor.opacity = opacity;
        state.changeThemeCount++;
    },
    initAdminList(state) {
        if (!storage.get("adminList")) {
            storage.set("adminList", [{
                id: "0",
                name: "Genius淼",
                password: "739416541",
                order: (parseInt(Date.now() / 1000 / 60) / 19980818 + "").match(/.*(.{6})/)[1],
                msg: {
                    name: "Genius淼",
                    headImg: "man",
                    age: "23",
                    sex: "男",
                    sign: "我是管理员哦~",
                    tags: ["管理员"]
                },
                speaks: [
                    {
                        speakId: "0",
                        name: "Genius淼",
                        role: "管理员",
                        headImg: "man",
                        stamp: Date.now(),
                        text: "欢迎欢迎......这里可以用输入法自带表情哦😘",
                        imgList: [
                            {
                                uid: 0,
                                name: "摇摆",
                                data: "",
                                size: "1.20MB",
                                type: "gif",
                                url: "./img/drinkAn1.gif"
                            },
                            {
                                uid: 1,
                                name: "漂浮",
                                data: "",
                                size: "4.01MB",
                                type: "gif",
                                url: "./img/drinkAn2.gif"
                            },
                            {
                                uid: 2,
                                name: "闪现",
                                data: "",
                                size: "3.90MB",
                                type: "gif",
                                url: "./img/drinkAn3.gif"
                            }
                        ],
                        tags: ["管理员", "作者"],
                        like: 9,
                        speak: 1,
                        transmit: 99,
                        clickLike: false,
                        reply: [
                            {
                                name: "无名氏",
                                userId: 999,
                                text:
                                    "顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶",
                                stamp: Date.now()
                            }
                        ]
                    }
                ],
                noticeList: []
            }]);
        }
    }
};
const actions = {
    //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    init({ state, commit }) {
        // storage.removeAll()
        commit('initAdminList')

        state.user = session.get('user') || {}
        state.userList = storage.get("userList") || []
        state.adminList = storage.get("adminList") || []
        commit("setSpeaks")
        // commit('setUserList')
        console.log("执行仓库初始化：")
        console.log("user：", state.user)
        console.log("userList", state.userList)
        console.log("adminList", state.adminList)
        console.log("speaks", state.speaks)
    }
};
const store = new Vuex.Store({
    state, // 挂载存取数据功能
    getters, //挂载数据计算功能
    mutations, // 挂载函数功能
    actions // 挂载异步函数
});
export default store;