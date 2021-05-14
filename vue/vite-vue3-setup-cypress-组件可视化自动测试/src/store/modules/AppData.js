let state = {
    count: 1,
}

const actions = {
    setAppData({ commit, state, dispatch, rootState, getters, rootGetters }, payload) {
        state.count = payload
    },
}

const mutations = {
    Add_COUNT(state, data) {
        state.count++
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
