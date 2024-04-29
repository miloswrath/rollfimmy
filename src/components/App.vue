<template>
  <div class="vq4-position-relative vq4-z-index-1 vq4-overflow-hidden vq4-padding-y-xl vq4-bg-dark">
    <div class="vq4-margin-bottom-lg">
      <h1 class="vq4-text-center">Vertical Timeline</h1>
    </div>
  
    <div class="vq4-container vq4-max-width-adaptive-lg">
  <div class="v-timeline js-v-timeline" data-animation="on">
    <section v-for="(item, index) in timelineData" :key="index" class="v-timeline__section js-v-timeline__section">
      <div class="v-timeline__marker vq4-bg-contrast-high vq4-border vq4-border-3 vq4-border-bg-dark" aria-hidden="true"></div>
      <div class="v-timeline__items-group">
        <div class="v-timeline__item vq4-bg-light vq4-padding-md vq4-radius-md vq4-shadow-xs">
          <div class="v-timeline__content">
            <figure class="v-timeline__image">
              <img :src="item.img" :alt="'Movie Poster for ' + item.title">
            </figure>
            <div class="v-timeline__text">
              <div class="v-timeline__date vq4-margin-bottom-sm">
                <time class="v-timeline__date-value" :datetime="item.date">{{ item.displayDate }}</time>
              </div>
              <div class="vq4-text-component">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
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
import Papa from 'papaparse';
import VTimeline from './src/VTimeline.js'; // Ensure the path is correct relative to this file

export default {
  mounted() {
    this.initTimeline();
    this.loadCsv();
  },
  data() {
    return {
      timelineData: []
    };
  },
  methods: {
    initTimeline() {
      const timelineElements = this.$el.querySelectorAll('.js-v-timeline');
      timelineElements.forEach(el => {
        new VTimeline(el);
      });
    },
    loadCsv() {
      const csvFile = 'src/data/imdb_top_1000.csv'; // Ensure the path is correct
      fetch(csvFile)
        .then(response => response.text())
        .then(csvData => {
          Papa.parse(csvData, {
            header: true,
            complete: (results) => {
              this.timelineData = results.data.map(item => ({
                date: `${item.Release_Year}-01-01`, // Ensure the date is in the correct format
                displayDate: item.Release_Year, // Display the year
                title: item.Series_Title,
                description: item.Overview,
                img: item.Poster_Link
              }));
            }
          });
        });
    }
  }
};
</script>

<style>
  .v-timeline__item {
    display: flex;
    align-items: flex-start; /* Align items at the start of the flex container */
  }

  .v-timeline__content {
    display: flex;
    width: 100%;
  }

  .v-timeline__image {
    flex: 1; /* Takes up 1 part of the flex container */
    display: block;
  }

  .v-timeline__image img {
    width: 75%; /* Ensures the image takes up the full width of its container */
    height: auto; /* Keeps the aspect ratio of the image */
    display: block;
  }

  .v-timeline__text {
    flex: 2; /* Takes up 2 parts of the flex container */
    padding-left: var(--vq4-space-md); /* Adds some space between the image and text */
  }

</style>