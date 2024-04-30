
<script>
import axios from "axios";
import TimelineComponent from "/src/components/TimelineComponent.vue";
import FilterComponent from "/src/components/Filters.vue";

export default {
  components: {
    "timeline-component": TimelineComponent,
    "filter-component": FilterComponent,
  },
  data() {
    return {
      filteredData: [],
      filterRatings: [null, null],
      filterDirectors: [],
      filterStars: [],
      filterYearRange: [null, null],
      filterSearch: "",
      filterGenres: [],
    };
  },
  mounted() {
    this.loadMovies();
  },
  methods: {
    async loadMovies() {
      try {
        const response = await axios.get("/data.json");
        this.filteredData = response.data || []; // Ensure it's always an array
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
    },
    computed: {
      filteredDataComputed() {
        let result = this.filteredData;

        // Filter by year range
        if (this.filterYearRange[0] && this.filterYearRange[1]) {
          result = result.filter(
            (item) =>
              item.Released_Year >= this.filterYearRange[0] &&
              item.Released_Year <= this.filterYearRange[1]
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

        // Filter by ratings range
        if (this.filterRatings[0] !== null && this.filterRatings[1] !== null) {
          result = result.filter(
            (item) =>
              parseFloat(item.IMDB_Rating) >=
                parseFloat(this.filterRatings[0]) &&
              parseFloat(item.IMDB_Rating) <= parseFloat(this.filterRatings[1])
          );
        }

        // Filter by directors
        if (this.filterDirectors.length > 0) {
          result = result.filter((item) =>
            this.filterDirectors.some((director) =>
              item.Director.toLowerCase().includes(director.toLowerCase())
            )
          );
        }

        // Filter by stars
        if (this.filterStars.length > 0) {
          result = result.filter((item) =>
            this.filterStars.some((star) =>
              Object.values(item)
                .slice(9, 13)
                .map((value) => value.toLowerCase())
                .includes(star.toLowerCase())
            )
          );
        }

        // Filter by search term
        if (this.filterSearch.trim() !== "") {
          result = result.filter((item) =>
            item.Series_Title.toLowerCase().includes(
              this.filterSearch.toLowerCase()
            )
          );
        }

        return result;
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
<template>
  <div
    class="vq4-position-relative vq4-z-index-1 vq4-overflow-hidden vq4-padding-y-xl vq4-bg-dark"
  >
    <div class="vq4-margin-bottom-lg">
      <h1 class="vq4-text-center">Vertical Timeline</h1>
    </div>
    <div>
      <filter-component
        @update-filters="handleUpdateFilters"
        :initial-data="filteredData"
      ></filter-component>

      <timeline-component v-if="filteredData && filteredData.length" :filtered-data="filteredData"></timeline-component>
    </div>
  </div>
</template>
