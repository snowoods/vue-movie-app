<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more"
      @keyup.enter="apply" />
    <div class="selects">
      <select 
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear() // 2024
            for (let i = thisYear; i >= 1985; i -= 1) {
              years.push(i)
            }
            return years
          })() // 즉시 실행 함수
        },
      ]
    }
  },
  methods: {
    async apply() {
      // 여기서 사용한 movie 이름이 store/index.js 모듈에 등록한 movie 이다.
      await this.$store.dispatch('movie/searchMovies', {
        // payload
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/scss/main';

.container {
  display: flex;
  > * { // 전체 선택자
    margin-right: 10px;
    font-size: 15px;
    &:last-child { // & 상위 선택자
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0; // 감소 비율 : 0이므로 다른 조정 가능한 컴포넌트가 줄어 든다. ex) Input
  }

  @include media-breakpoint-down(lg) {
    display: block; // 기존 수평 배치(flex)에서 수직(block)으로 변경
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;      
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%
    }
  }
}
</style>