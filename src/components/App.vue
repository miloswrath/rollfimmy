<template>
  <div class="vq4-position-relative vq4-z-index-1 vq4-overflow-hidden vq4-padding-y-xl vq4-bg-dark">
    <div class="vq4-margin-bottom-lg">
      <h1 class="vq4-text-center">Vertical Timeline</h1>
    </div>
    <div>
      <filter-component @filters-applied="handleFilteredData" :initial-data="initialData"></filter-component>
      <timeline-component :data="filteredData"></timeline-component>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { initialFilter } from '../filters.js'; // Import the initialFilter function
import FilterComponent from '/src/components/Filters.vue';
import TimelineComponent from '/src/components/TimelineComponent.vue';

export default {
  components: {
    FilterComponent,
    TimelineComponent
  },
  data() {
    return {
      initialData: [],  // Store initial unfiltered data
      filteredData: []  // Store data to display
    };
  },
  mounted() {
    this.loadInitialData();
  },
  methods: {
    async loadInitialData() {
      try {
        const response = await axios.get('/data.json');
        console.log('Axios response:', response.data);  // This should log the actual data received
        if (!Array.isArray(response.data)) {
          throw new Error('Fetched data is not an array');
        }
        this.movies = response.data;
        this.applyFilters();
      } catch (error) {
        console.error('Error loading movies:', error);
      }
    },

    handleFilteredData(data) {
      this.filteredData = data;  // Update filtered data upon filter application
    }

  },

}

</script>

<style>
.v-timeline__item {
  display: flex;
  align-items: flex-start;
  /* Align items at the start of the flex container */
}

.v-timeline__content {
  display: flex;
  width: 100%;
}

.v-timeline__image {
  flex: 1;
  /* Takes up 1 part of the flex container */
  display: block;
}

.v-timeline__image img {
  width: 75%;
  /* Ensures the image takes up 75% oih the full width of its container */
  height: auto;
  /* Keeps the aspect ratio of the image */
  display: block;
}

.v-timeline__text {
  flex: 2;
  /* Takes up 2 parts of the flex container */
  padding-left: var(--vq4-space-md);
  /* Adds some space between the image and text */
}
</style>
