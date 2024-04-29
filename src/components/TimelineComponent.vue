<template>
  <div class="vq4-position-relative vq4-z-index-1 vq4-overflow-hidden vq4-padding-y-xl vq4-bg-dark">
    <div class="vq4-margin-bottom-lg">
      <h1 class="vq4-text-center">Vertical Timeline</h1>
    </div>

    <div class="vq4-container vq4-max-width-adaptive-lg">
      <div class="v-timeline js-v-timeline" data-animation="on">
        <section v-for="(item, index) in filteredData" :key="index" class="v-timeline__section js-v-timeline__section">
          <div class="v-timeline__marker vq4-bg-contrast-high vq4-border vq4-border-3 vq4-border-bg-dark"
            aria-hidden="true"></div>
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
import { filterByYear, filterByTitleContains, sortByDateDescending } from './filters.js';
import rawData from './data.json'; // Assuming your data is imported from a JSON file or similar

export default {
  data() {
    return {
      searchText: '',
      selectedYear: '',
      filteredData: [],
      availableYears: [], // You would populate this based on your data
    };
  },
  mounted() {
    this.filteredData = rawData; // Initialize with raw data or perform an initial filter
    this.availableYears = [...new Set(rawData.map(item => item.Release_Year))];
    this.applyFilters(); // Apply filters on mount to sort or do initial filtering
  },
  methods: {
    applyFilters() {
      let result = rawData;
      if (this.selectedYear) {
        result = filterByYear(result, this.selectedYear);
      }
      if (this.searchText) {
        result = filterByTitleContains(result, this.searchText);
      }
      this.filteredData = sortByDateDescending(result);
    }
  }
};
</script>