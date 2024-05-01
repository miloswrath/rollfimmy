<template>
  <div>
    <button @click="toggleFilters">Filters</button>
    <div class="search-input search-input--icon-right">
      <input
        class="search-input__input form-control"
        type="search"
        name="search-input"
        id="search-input"
        placeholder="Search..."
        aria-label="Search"
        v-model="filterSearch"
      />
      <button class="search-input__btn" @click="applyFilters">
        <svg class="icon" viewBox="0 0 20 20">
          <title>Submit</title>

          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <circle cx="8" cy="8" r="6" />
            <line x1="12.242" y1="12.242" x2="18" y2="18" />
          </g>
        </svg>
      </button>
    </div>
    <div v-if="showFilters">
      <div class="slider slider--multi-value js-slider">
        <div class="slider__range">
          <label class="sr-only" for="sliderMinValue"> </label>
          <input
            class="slider__input"
            type="range"
            id="sliderMinValue"
            name="sliderMinValue"
            min="1920"
            max="2020"
            step="1"
            value="100"
            v-model="filterYearRange[0]"
          />
        </div>

        <div class="slider__range">
          <label class="sr-only" for="sliderMaxValue"> </label>
          <input
            class="slider__input"
            type="range"
            id="sliderMaxValue"
            name="sliderMaxValue"
            min="1920"
            max="2020"
            step="1"
            value="100"
            s
            v-model="filterYearRange[1]"
          />
        </div>
        <!-- Filter by Year -->
      </div>
      <div>
        <label>Year: {{ filterYearRange[0] }} - {{ filterYearRange[1] }}</label>
      </div>

      <!-- Filter by Genre -->
      <div>
        <label>Genre:</label>
        <div v-for="genre in genres" :key="genre">
          <input type="checkbox" :value="genre" v-model="filterGenres" />
          {{ genre }}
        </div>
        <!-- Apply Filters Button -->
        <button @click="applyFilters">Apply Filters</button>
      </div>
      <button @click="clearFilters">Clear Filters</button>
    </div>
  </div>
</template>

<script>
import Util from "/src/Util.js";

export default {
  name: "FilterComponent",
  data() {
    return {
      showFilters: false,
      filterGenres: [],
      filterYearRange: [1920, 2020],
      genres: ["Action", "Drama", "Comedy", "Thriller"],
      clearBool: false,
    };
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    clearFilters() {
      this.filterGenres = [];
      this.filterYearRange = [1920, 2020];
      this.filterDirectors = [];
      this.filterStars = [];
      this.filterSearch = "";
      this.clearBool = true;
      console.log("FilterComponent clearFilters clearBool:", {
        filterGenres: this.filterGenres,
        filterYearRange: this.filterYearRange,
        clearBool: this.clearBool,
      });
      this.applyFilters();
      this.clearBool = false;
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
        clearBool: this.clearBool,
      });
    },
  },
};
</script>

<style scoped>
.slider--multi-value {
  position: relative;
}
.slider--multi-value .slider__range {
  pointer-events: none;
}

.slider--multi-value .slider__range:nth-of-type(1) {
  --slider-fill-value-start: 0%;
  --slider-fill-value-end: 100%;
}

.slider--multi-value .slider__range:nth-of-type(2) {
  position: absolute;
  top: 0;
  left: 0;
}

.slider--multi-value .slider__input::-webkit-slider-thumb {
  position: relative;
  z-index: 2;
  pointer-events: auto;
}
.slider--multi-value .slider__input::-moz-range-thumb {
  position: relative;
  z-index: 2;
  pointer-events: auto;
}
.slider--multi-value .slider__input::-webkit-slider-runnable-track {
  pointer-events: none;
  background-image: linear-gradient(
    to right,
    var(--color-contrast-lower) var(--slider-fill-value-start),
    var(--color-primary) var(--slider-fill-value-start),
    var(--color-primary) var(--slider-fill-value-end),
    var(--color-contrast-lower) var(--slider-fill-value-end)
  );
}
.slider--multi-value .slider__input::-moz-range-track {
  pointer-events: none;
  background-image: linear-gradient(
    to right,
    var(--color-contrast-lower) var(--slider-fill-value-start),
    var(--color-primary) var(--slider-fill-value-start),
    var(--color-primary) var(--slider-fill-value-end),
    var(--color-contrast-lower) var(--slider-fill-value-end)
  );
}
.slider--multi-value
  .slider__range:nth-of-type(2)
  .slider__input::-moz-range-track {
  background-image: none;
}

:not(*)::-ms-track,
.slider--multi-value.slider--ms-fallback {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

:not(*)::-ms-track,
.slider--multi-value.slider--ms-fallback .slider__range {
  pointer-events: auto;
  width: 48%;
}

:not(*)::-ms-track,
.slider--multi-value.slider--ms-fallback .slider__range:nth-of-type(2) {
  position: relative;
}

.slider__separator {
  margin: auto var(--space-xs);
}

.slider--multi-value.slider--range-not-supported .slider__range {
  display: inline-block;
  width: 45%;
}
.slider--multi-value.slider--range-not-supported .slider__range:nth-of-type(2) {
  position: relative;
}

.slider--range-not-supported .slider__separator {
  display: none;
}
</style>
