import Vue from 'vue'
import Vuex from 'vuex'

import axiosInstance from "../services/api";

Vue.use(Vuex);


const rootUrl = 'http://interview.agileengine.com';

const store = new Vuex.Store({
	modules: {
	},
	state: {
		pictures: [],
		loading: false,
		axiosInstance: null,
		currentPictures: [],
		hasMoreImages: null,
		currentPage: 1,
		pageCount: null,
		currentPicture: [],
		picturesDetailsPool: [],
		picturesPool: []
	},
	mutations: {
		FETCHED_IMAGES(state, payload) {
			state.picturesPool = [...state.picturesPool, payload];
		},
		SET_LOADING(state, payload) {
			state.loading = payload.loading;
		},
		SET_AXIOS_INSTANCE(state, payload) {
			state.axiosInstance = payload.instance;
		},
		FETCHED_IMAGE(state, payload){
			state.picturesDetailsPool = [...state.picturesDetailsPool, payload];
		},
		SET_CURRENT_PICTURE(state, payload) {
			state.currentPicture = payload;
		},
		SET_CURRENT_IMAGES(state, payload) {
			state.pictures = payload.pictures;
			state.currentPictures = payload.pictures;
			state.hasMoreImages = payload.hasMore;
			state.currentPage = payload.page;
			state.pageCount = payload.pageCount;
		}
	},
	actions: {
		FETCH_IMAGES({ commit, state }, { page }) {
			const images = state.picturesPool.find(pp => pp.page == page);
			if (images) {
				commit('SET_CURRENT_IMAGES',images);
			} else {
				const request = axiosInstance.get(`${rootUrl}/images`, {params: {page: page}});
				request.then(resp => {
					commit('FETCHED_IMAGES', resp.data);
					commit('SET_CURRENT_IMAGES', resp.data);
				});
				return request;
			}
		},
		FETCH_IMAGE_DETAILS({commit, state}, id){
			const image = state.picturesDetailsPool.find(img => id == img.id);
			console.log(image)
			if(image) {
				commit('SET_CURRENT_PICTURE', image);
			} else {
				const request = axiosInstance.get(`${rootUrl}/images/${id}`);
				request.then(resp => {
					commit('FETCHED_IMAGE', resp.data);
					commit('SET_CURRENT_PICTURE', resp.data);
				});
				return request;
			}

		},
		SET_IMAGE_DETAILS_PREV_PICTURE({state, dispatch}) {
			let searchIndex = null;
			for (let index in state.currentPictures) {
				if (state.currentPicture.id ==  state.currentPictures[index].id) {
					searchIndex = index;
				}
			}
			console.log(searchIndex);
			if (!searchIndex || searchIndex <= 1) {
				return;
			} else {
				const newCurrentPicture = state.currentPictures[searchIndex - 1];
				console.log(newCurrentPicture);
				dispatch('FETCH_IMAGE_DETAILS', newCurrentPicture.id);
			}
		},
		SET_IMAGE_DETAILS_NEXT_PICTURE({state, dispatch}) {
			let searchIndex = null;
			for (let index in state.currentPictures) {
				if (state.currentPicture.id ==  state.currentPictures[index].id) {
					searchIndex = index;
				}
			}
			console.log(searchIndex);
			if (!searchIndex || searchIndex <= 0 || searchIndex == 9) {
				return;
			} else {
				const newCurrentPicture = state.currentPictures[parseInt(searchIndex) + 1];
				dispatch('FETCH_IMAGE_DETAILS', newCurrentPicture.id);
			}
		}
	},
	getters: {
		loading({ loading }) {
			return loading;
		},
		currentPictures({currentPictures}){
			return currentPictures;
		},
		currentPage({currentPage}){
			return currentPage;
		},
		currentPicture({currentPicture}) {
			return currentPicture;
		},
		hasMoreImages({hasMoreImages}) {
			return hasMoreImages;
		}
	}
});

export default store;