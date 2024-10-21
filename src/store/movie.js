import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // module! 화하여 명시적으로 사용
  namespaced: true,

  // data! 취급해야하는 데이터 혹은 상태
  // state: function () {
  //   return {
  //     movies: []
  //   }
  // },
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),

  // computed! 계산된 데이터를 만든다.
  getters: {
    movieIds(state) {
      return state.movies.map(m => m.imdbID)
    }
  },

  // methods! : 둘 다(mutations, actions) 함수로 사용한다.
  // 수정용
  // 변이를 통해서만 데이터/상태/state를 수정할 수 있다.  
  mutations: {
    // state 데이터 업데이트 변이 함수
    updateState(state, payload) {
      // 객체 속성 이름 -> 배열로 추출
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        // state.movies = payload.movies
        // state.message = payload.message
        // state['movies'] = payload['movies']
        // state['message'] = payload['message']
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = [],
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // 수행용
  // 비동기 (async ~ await 사용)
  actions: {
    // searchMovies(context) {
    //   context.state
    //   context.getters
    //   context.commit
    // }

    // async searchMovies(context, payload) {
    async searchMovies({ state, commit }, payload) {
      // 다중 실행 방지
      if (state.loading) return

      // 메시지 초기화
      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        // const { title, type, number, year } = payload
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })

        // OMDB 검색 데이터 구조 ex) Search = { Title, Year, ImdbID, ... }
        const { Search, totalResults } = res.data
        // commit : mutation 실행
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID'),
          // message: 'Hello world!',
          // loading: true
        })
        console.log(Search)
        console.log(totalResults)
        console.log(typeof totalResults)

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)

        // 추가 요청!
        if (pageLength > 1) {
          for (let page = 2; page <= pageLength; page += 1) {
            if (page > payload.number / 10) break
            const res = await _fetchMovie({
              ...payload,
              page
            })

            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch({ message }) { // 로컬 람다는 원격 값이므로 에러 객체로 넘어온다.
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)  // 람다 호출

  // const { title, type, year, page, id } = payload
  // const OMDB_API_KEY = '18372ba4'
  // const url = id 
  // ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
  // : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  // return new Promise((resolve, reject) => {
  //   axios.get(url)
  //     .then((res) => {
  //       // console.log(res)
  //       // 정상 결과에 에러 메시지가 나올 수 있다.
  //       if (res.data.Error) {
  //         reject(res.data.Error)
  //       }
  //       resolve(res)
  //     })
  //     .catch(err => {
  //       reject(err.message) // axios.get 에러 발생하면 javascript error 객체 전달.
  //     })
  // })
}    