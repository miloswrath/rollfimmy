<template>
  <div>
    <button @click="toggleFilters">Filters</button>
    <div v-if="showFilters">
      <!-- Filter by Year -->
      <div>
        <label>Year: {{ filterYearRange[0] }} - {{ filterYearRange[1] }}</label>
        <input
          type="range"
          min="1920"
          max="1970"
          v-model.number="filterYearRange[0]"
        />
        <input
          type="range"
          min="1971"
          max="2020"
          v-model.number="filterYearRange[1]"
        />
      </div>

      <!-- Filter by Genre -->
      <div>
        <label>Genre:</label>
        <div v-for="genre in genres" :key="genre">
          <input type="checkbox" :value="genre" v-model="filterGenres" />
          {{ genre }}
        </div>
      </div>

      <!-- Apply Filters Button -->
      <button @click="applyFilters">Apply Filters</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterComponent',
  data() {
    return {
      showFilters: false,
      filterGenres: [],
      filterYearRange: [1920, 2020],
      genres: ["Action", "Drama", "Comedy", "Thriller"],
    };
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    applyFilters() {
      // Emit all filter criteria to the parent component
      console.log("FilterComponent applyFilters:", {
        filterGenres: this.filterGenres,
        filterYearRange: this.filterYearRange,
      });
      this.$emit("update-filters", {
        filterGenres: this.filterGenres,
        filterYearRange: this.filterYearRange,
        filterGenres: this.filterGenres,
        filterDirectors: this.filterDirectors,
        filterStars: this.filterStars,
        filterSearch: this.filterSearch,
      });
    },
  },
};
</script>
