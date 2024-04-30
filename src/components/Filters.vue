<template>
  <div>
    <button @click="toggleFilters">Filters</button>
    <div v-if="showFilters">
      <div>
        <label>Filter by Year:</label>
        <input type="range" min="1920" max="2020" v-model="selectedYear">
      </div>
      <div>
        <label>Filter by Genre:</label>
        <div v-for="(genre, index) in genres" :key="index">
          <input type="checkbox" :value="genre" v-model="selectedGenres"> {{ genre }}
        </div>
      </div>
      <button @click="applyFilters">Apply Filters</button>
    </div>
    <div>
      <ul>
        <li v-for="(movie, index) in filteredMovies" :key="index">{{ movie.title }} - {{ movie.year }} - {{ movie.genre
          }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { filterByYear, filterByGenres } from '../filters.js';

export default {
  data() {
    return {
      showFilters: false,
      selectedYear: null,
      selectedGenres: [],
      movies: [], // Array to store movies data
      filteredMovies: [], // Array to store filtered movies
      genres: ['Action', 'Drama', 'Comedy', 'Thriller'],
    };
  },
  methods: {
    async toggleFilters() {
      this.showFilters = !this.showFilters;
      if (this.showFilters) {
        await this.loadMovies();
      }
    },
    async loadMovies() {
      try {
        const response = await axios.get('/path/to/your/data.json');
        this.movies = response.data || []; // Ensure it's always an array
        this.applyFilters(); // Apply filters when movies are loaded
      } catch (error) {
        console.error('Error loading movies:', error);
      }
    },
    applyFilters() {
      if (Array.isArray(this.movies)) {
        this.filteredMovies = this.movies.filter(movie => {
          let yearMatch = this.selectedYear ? filterByYear([movie], this.selectedYear).length > 0 : true;
          let genreMatch = this.selectedGenres.length > 0 ? filterByGenres([movie], this.selectedGenres).length > 0 : true;
          return yearMatch && genreMatch;
        });
      } else {
        console.error('Error: movies data is not an array', this.movies);
      }
    },
  },
};
</script>




<style>
:root {
  --btn-font-size: 1em;
  --btn-padding-x: var(--space-sm);
  --btn-padding-y: var(--space-xxs);
  --btn-radius: var(--radius-md);
}

.btn {
  background: var(--color-bg-dark);
  color: var(--color-contrast-higher);
  cursor: pointer;
  text-decoration: none;
  line-height: 1.2;
  font-size: var(--btn-font-size);
  transition: all 0.2s ease;
  will-change: transform;

  &:focus {
    box-shadow: 0px 0px 0px 2px var(--color-bg), 0px 0px 0px 4px alpha(var(--color-contrast-higher), 0.15);
    outline: none;
  }

  &:active {
    transform: translateY(2px);
  }
}


.btn--primary {
  background: var(--color-primary);
  color: var(--color-white);
  box-shadow: inset 0px 1px 0px alpha(var(--color-white), 0.15), 0px 1px 3px alpha(var(--color-primary-darker), 0.25), 0px 2px 6px alpha(var(--color-primary-darker), 0.1), 0px 6px 10px -2px alpha(var(--color-primary-darker), 0.25);

  &:hover {
    background: var(--color-primary-light);
    box-shadow: inset 0px 1px 0px alpha(var(--color-white), 0.15), 0px 1px 2px alpha(var(--color-primary-darker), 0.25), 0px 1px 4px alpha(var(--color-primary-darker), 0.1), 0px 3px 6px -2px alpha(var(--color-primary-darker), 0.25);
  }

  &:focus {
    box-shadow: inset 0px 1px 0px alpha(var(--color-white), 0.15), 0px 1px 2px alpha(var(--color-primary-darker), 0.25), 0px 1px 4px alpha(var(--color-primary-darker), 0.1), 0px 3px 6px -2px alpha(var(--color-primary-darker), 0.25), 0px 0px 0px 2px var(--color-bg), 0px 0px 0px 4px var(--color-primary);
  }
}

.btn--subtle {
  background: var(--color-bg-lighter);
  color: var(--color-contrast-higher);
  box-shadow: inset 0px 1px 0px alpha(var(--color-white), 0.1), 0px 0px 0px 1px alpha(var(--color-black), 0.02), 0px 1px 3px -1px alpha(var(--color-black), 0.2), 0px 3px 6px alpha(var(--color-black), 0.12);

  &:hover {
    background: var(--color-bg-light);
    box-shadow: inset 0px 1px 0px alpha(var(--color-white), 0.1), 0px 0px 0px 1px alpha(var(--color-black), 0.02), 0px 1px 2px alpha(var(--color-black), 0.12), 0px 1px 3px -1px alpha(var(--color-black), 0.2);
  }

  &:focus {
    box-shadow: inset 0px 1px 0px alpha(var(--color-white), 0.1), 0px 0px 0px 1px alpha(var(--color-black), 0.02), 0px 1px 3px -1px alpha(var(--color-black), 0.2), 0px 3px 6px alpha(var(--color-black), 0.12), 0px 0px 0px 2px var(--color-bg), 0px 0px 0px 4px var(--color-contrast-high);
  }
}

.btn--accent {
  background: var(--color-accent);
  color: var(--color-white);
  box-shadow: inset 0px 1px 0px alpha(var(--color-white), 0.15), 0px 1px 3px alpha(var(--color-accent-darker), 0.25), 0px 2px 6px alpha(var(--color-accent-darker), 0.1), 0px 6px 10px -2px alpha(var(--color-accent-darker), 0.25);

  &:hover {
    background: var(--color-accent-light);
    box-shadow: inset 0px 1px 0px alpha(var(--color-white), 0.15), 0px 1px 2px alpha(var(--color-accent-darker), 0.25), 0px 1px 4px alpha(var(--color-accent-darker), 0.1), 0px 3px 6px -2px alpha(var(--color-accent-darker), 0.1);
  }

  &:focus {
    box-shadow: inset 0px 1px 0px alpha(var(--color-white), 0.15), 0px 1px 2px alpha(var(--color-accent-darker), 0.25), 0px 1px 4px alpha(var(--color-accent-darker), 0.1), 0px 3px 6px -2px alpha(var(--color-accent-darker), 0.1), 0px 0px 0px 2px var(--color-bg), 0px 0px 0px 4px var(--color-accent);
  }
}

.btn--disabled,
.btn[disabled],
.btn[readonly] {
  opacity: 0.6;
  cursor: not-allowed;
}


.btn--sm {
  font-size: 0.8em;
}

.btn--md {
  font-size: 1.2em;
}

.btn--lg {
  font-size: 1.4em;
}
</style>