<template>
  <div class="home">
    <div v-if="loading">
    Cargando...
    </div>
    <div v-else>
      <div>
        <ul class="images-preview-container">
            <li class="image-preview" v-for="picture in currentPictures" :key="picture.id" v-on:click="openPopup(picture.id)"> 
                <img :src="picture.cropped_picture" />
            </li>  
        </ul>
        <div class="pagination">
          <span v-on:click="prevPage" :disabled="currentPage == 1"> <font-awesome-icon icon="angle-left" /> </span>
          <span>{{ currentPage }}</span>
          <span v-on:click="nextPage" :disabled="!hasMore"> <font-awesome-icon icon="angle-right" /> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageDetails from '../components/ImageDetails';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight);
library.add(faAngleLeft);

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    loading: {
      get() {
        return this.$store.getters.loading;
      },
      set(loading) {
        this.$store.commit('SET_LOADING', {loading: loading});
      }
    },
    currentPictures() {
      return this.$store.getters.currentPictures;
    },
    currentPage() {
      return this.$store.getters.currentPage;
    },
    currentPicture() {
      return this.$store.getters.currentPicture;
    },
    hasMore() {
      return this.$store.getters.hasMoreImages;
    }
  },
  mounted() {
    this.fetchImages(this.currentPage);
  },
  methods: {
    async openPopup(id) {
      await this.$store.dispatch('FETCH_IMAGE_DETAILS', id);
      this.$FModal.show(
        {
          component: ImageDetails,
          maxHeight: '90%', 
          width: '70%',
          placement: 'center center' 
        }, {imageData: this.currentPicture});
    },
    fetchImages(page) {
      this.loading = true;
      const req = this.$store.dispatch('FETCH_IMAGES', {page: page});
      req.finally(() => {
        this.loading = false;
      });
    },
    nextPage() {
      if (this.hasMore) {
        this.fetchImages(this.currentPage + 1);
      }
    },
    prevPage() {
      this.fetchImages(this.currentPage - 1);
    }
  }
}
</script>
<style>
  .images-preview-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 0;
  }
  li {
    height: 30vh;
    flex-grow: 1;
    list-style: "";
  } 
  img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    cursor: pointer;
    vertical-align: bottom;
  }
  .pagination {
    display: flex;
    margin: auto;
    justify-content: space-between;
    width: 300px;
  }
  span[disabled] {
    color: #949494;
    cursor: pointer;
  }
</style>