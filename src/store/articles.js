import * as mType from './mutation-types'

const state = {
    id: '',
    title: '',
    intro: '',
    type: '',
    tags: '',
    views: 1,
    likes: 1,
    content: '',
    isPublished: '',
    isRecommend: 0,
    thumbUrl: '',
    uniqueMark: '',
}

const getters = {
    getArticle: state => state
}

const actions = {
    addArticle: async function({commit, state}) {
        try {
            return await axios.post(
                '/api/v1/articles/',
                {
                    ...state
                }
            )
        }
        catch (error) {
            console.error(error.response.data.error)
            return error; 
        }
    },
    getArticleById: async function ({commit, state}, id) {
        try {
            return await axios.get(`/api/v1/articles/article/${id}`)
        }
        catch (error) {
            console.error(error.response.data.error)
            return error; 
        }
    },
    updateArticleById: async function ({commit, state}) {
        try {
            return await axios.put(`/api/v1/articles/update/${state.id}`, {...state })
        }
        catch (error) {
            console.error(error.response.data.error)
        }
    }
}

const mutations = {
    [mType.SET_ARTICLE] (state, payload) {
        state.id = payload.id,
        state.title = payload.title,
        state.intro = payload.intro,
        state.type = payload.type,
        state.tags = payload.tags,
        state.views = payload.views,
        state.likes = payload.likes,
        state.content = payload.content,
        state.isPublished = payload.isPublished,
        state.isRecommend = payload.isRecommend,
        state.thumbUrl = payload.thumbUrl,
        state.uniqueMark = payload.uniqueMark
    },
    [mType.SET_ARTICLE_TYPE] (state, type) {
        state.type = type
    },
    [mType.SET_ARTICLE_TITLE] (state, title) {
        state.title = title
    },
    [mType.SET_ARTICLE_INTRO] (state, intro) {
        state.intro = intro
    },
    [mType.SET_ARTICLE_TAGS] (state, tags) {
        state.tags = tags
    },
    [mType.SET_ARTICLE_VIEWS] (state, views) {
        state.views = views
    },
    [mType.SET_ARTICLE_LIKES] (state, likes) {
        state.likes = likes
    },
    [mType.SET_ARTICLE_CONTENT] (state, content) {
        state.content = content
    },
    [mType.SET_ARTICLE_ISPUBLISHED] (state, isPublished) {
        state.isPublished = isPublished
    },
    [mType.SET_ARTICLE_THUMBNAIL] (state, imgUrl) {
        state.thumbnail = imgUrl
    },
    [mType.CLEAR_ARTICLE] (state) {
        state.id = '',
        state.type = '',
        state.title = '',
        state.intro = '',
        state.tags = '',
        state.views = '',
        state.likes = '',
        state.content = '',
        state.isPublished = 1
    },
    [mType.SET_ARTICLE_ISRECOMMEND] (state, isRecommend) {
        state.isRecommend = isRecommend
    },
    [mType.SET_ARTICLE_THUMBURL] (state, thumbUrl) {
        state.thumbUrl = thumbUrl
    },
    [mType.SET_ARTICLE_UNIQUEMARK] (state, uniqueMark) {
        state.uniqueMark = uniqueMark
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}