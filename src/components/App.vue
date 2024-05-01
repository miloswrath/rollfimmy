<script>
import axios from "axios";
import TimelineComponent from "/src/components/TimelineComponent.vue";
import FilterComponent from "/src/components/Filters.vue";
import { initializeVTimelines } from "/src/VTimeline.js";

export default {
  components: {
    "timeline-component": TimelineComponent,
    "filter-component": FilterComponent,
  },
  data() {
    return {
      filteredData: [],
      initialData: [],
      filterRatings: [null, null],
      filterDirectors: [],
      filterStars: [],
      filterYearRange: [null, null],
      filterSearch: "",
      filterGenres: [],
      clearBool: false,
    };
  },
  mounted() {
    this.loadMovies();
    initializeVTimelines();
  },
  methods: {
    async loadMovies() {
      try {
        const response = await axios.get("/data.json");
        this.initialData = response.data || []; // Ensure it's always an array
        this.filteredData = response.data || []; // Ensure it's always an array
        // initally sort the data by year
        this.filteredData.sort((a, b) => b.Released_Year - a.Released_Year);
        console.log("initialData set in App.vue:", this.filteredData);
      } catch (error) {
        console.error("Error loading movies in app.vue:", error);
      }
    },
    handleUpdateFilters(criteria) {
      this.filterGenres = criteria.filterGenres;
      this.filterYearRange = criteria.filterYearRange;
      this.filterRatings = criteria.filterRatings;
      this.filterDirectors = criteria.filterDirectors;
      this.filterStars = criteria.filterStars;
      this.filterSearch = criteria.filterSearch;
      this.clearBool = criteria.clearBool;
      console.log("Received filter update:", criteria);
      this.filteredDataComputed();
    },
    clearData() {
      this.filteredData = initialData;
    },
    filteredDataComputed() {
      let result = this.filteredData;
      console.log("Year range", this.filterYearRange);
      console.log("Genres", this.filterGenres);
      console.log("Search", this.filterSearch);
      console.log("clearBool", this.clearBool);
      if (this.clearBool) {
        this.filteredData = this.initialData;
        console.log(
          "filteredData set in App.vue within clear:",
          this.filteredData
        );
        this.clearBool = false;
        return this.filteredData;
      }
      // Filter by year range

      if (this.filterYearRange[0] && this.filterYearRange[1]) {
        result = result.filter(
          (item) =>
            item.Released_Year >= this.filterYearRange[0] &&
            item.Released_Year <= this.filterYearRange[1]
        );
      }
      if (this.filterSearch) {
        result = result.filter((item) =>
          item.Series_Title.toLowerCase().includes(
            this.filterSearch.toLowerCase()
          )
        );
      }
      // Filter by genres
      if (this.filterGenres.length > 0) {
        result = result.filter((item) =>
          this.filterGenres.some((genre) =>
            item.Genre.toLowerCase().includes(genre.toLowerCase())
          )
        );
      }

      this.filteredData = result;
      console.log("result from filteredDataComputed in App.vue:", result);
      console.log("filteredData set in App.vue:", this.filteredData);
      return this.filteredData;
    },

    watch: {
      filteredData(newVal, oldVal) {
        console.log("App.vue filteredData changed:", newVal);
      },
    },
  },
};
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
  width: 95%;
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
header {
  display: flex;
  align-items: center; /* This vertically centers the logo if the header is taller than the logo */
  padding: 10px; /* Add padding around the content of the header */
}

.logo {
  height: 50px; /* Or your desired size */
  width: auto; /* Maintain aspect ratio */
  margin-right: 20px; /* Space between logo and any other header content */
}
</style>
<template>
  <header>
    <img src="./src/assets/looo.svg" alt="Logo" class="logo" />
    <!-- Rest of your header or nav content -->
  </header>
  <div
    class="vq4-position-relative vq4-z-index-1 vq4-overflow-hidden vq4-padding-y-xl vq4-bg-dark"
  >
    <div class="vq4-margin-bottom-lg">
      <h1 class="vq4-text-center">RollFilm</h1>
    </div>
    <div>
      <filter-component
        @update-filters="handleUpdateFilters"
        :initial-data="filteredData"
      ></filter-component>

      <timeline-component
        v-if="filteredData && filteredData.length"
        :filtered-data="filteredData"
      ></timeline-component>
    </div>
  </div>
</template>
