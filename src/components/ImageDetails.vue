<template>
    <div id="popup-content">
        <div id="image-container">
            <panZoom>
                <div class="action-button prev" v-on:click="prevImage">
                    <font-awesome-icon icon="angle-left" />
                </div>
                <div class="action-button next" v-on:click="nextImage">
                    <font-awesome-icon icon="angle-right" />
                </div>
                <img class="zoomable" :src="currentPicture.full_picture"/>
                <div id="image-details">
                    <h3>
                        {{currentPicture.author}}
                    </h3>
                    <h4>
                        {{currentPicture.camera}}
                    </h4>
                    <div>
                        {{currentPicture.tags}}
                    </div>
                    <div>
                        <span v-clipboard="currentPicture.full_picture" v-clipboard:success="clipboardSuccessHandler">
                            <font-awesome-icon v-if="copiedToClipboard" icon="check" />
                            <font-awesome-icon v-else icon="share-alt-square" />
                        </span>
                    </div>
                </div>
            </panZoom>
        </div>
    </div>
</template>
<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft, faShareAltSquare, faCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight);
library.add(faAngleLeft);
library.add(faShareAltSquare);
library.add(faCheck);

export default {
    data() {
        return {
            copiedToClipboard: false
        }
    },
    computed: {
        currentPicture() {
            return this.$store.getters.currentPicture;
        }
    },
    methods: {
        prevImage() {
            this.$store.dispatch('SET_IMAGE_DETAILS_PREV_PICTURE');
        },
        nextImage() {
            this.$store.dispatch('SET_IMAGE_DETAILS_NEXT_PICTURE');
        },
        clipboardSuccessHandler() {
            console.log(this.$toast)
            this.copiedToClipboard = true;
            setTimeout(() => {
                this.copiedToClipboard = false
            }, 500)
        }
    }
}
</script>
<style scoped="scoped" >
    #popup-content {
        width: 100%
    }
    #image-container {
        position: relative;
    }
    #image-details {
        position: absolute;
        bottom: 0;
        left: 0;
        padding-left: 10px;
        padding-bottom: 10px;
        width: 100%;
        background: rgba(0, 0, 0, .6);
        color: white;
    }
    .action-button {
        background: rgba(0, 0, 0, .6);
        position: absolute;
        top: 50%;
        font-size: 20px;
        color: white;
        cursor:pointer;
    }
    .action-button.prev {
        left: 0;
    }
    .action-button.next {
        right: 0;
    }
    img {
        width: 100%
    }
</style>