<template>
  <div
    class="vq4-position-relative vq4-z-index-1 vq4-overflow-hidden vq4-padding-y-xl vq4-bg-dark"
  >
    <div class="vq4-margin-bottom-lg"></div>

    <div class="vq4-container vq4-max-width-adaptive-lg">
      <div class="v-timeline js-v-timeline" data-animation="on">
        <section
          v-for="(item, index) in filteredData"
          :key="index"
          class="v-timeline__section js-v-timeline__section"
        >
          <div
            class="v-timeline__marker vq4-bg-contrast-high vq4-border vq4-border-3 vq4-border-bg-dark"
            aria-hidden="true"
          ></div>
          <div class="v-timeline__items-group">
            <div
              class="v-timeline__item vq4-bg-light vq4-padding-md vq4-radius-md vq4-shadow-xs"
            >
              <div class="v-timeline__content">
                <figure class="v-timeline__image">
                  <img
                    :src="item.Poster_Link"
                    :alt="'Movie Poster for ' + item.Series_Title"
                  />
                </figure>
                <div class="v-timeline__text">
                  <div class="v-timeline__date vq4-margin-bottom-sm">
                    <time
                      class="v-timeline__date-value"
                      :datetime="item.Released_Year"
                      >{{ item.Released_Year }}</time
                    >
                  </div>
                  <div class="vq4-text-component">
                    <h2>{{ item.Series_Title }}</h2>
                    <p>{{ item.Overview }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import { initializeVTimelines } from '/src/VTimeline.js';
export default {
  name: 'TimelineComponent',
  props: {
    filteredData: Array, // Expect an array of objects containing the necessary properties
  },
  mounted() {
    initializeVTimelines();
  },
  watch: {
    filteredData(newVal, oldVal) {
      console.log('TimelineComponent filteredData changed:', newVal);
    },
  },
  data() {
    return {
      filterRatings: [null, null], // Array to store rating range
      filterDirectors: [], // Array to store selected directors
      filterStars: [], // Array to store selected stars
      filterYearRange: [null, null], // Array to store year range
      filterSearch: "", // String to store search query
    };
  },
};
</script>
