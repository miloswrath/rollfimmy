<template>
    <div>
      <input v-model="searchText" placeholder="Search by title..." @input="applyFilters">
      <select v-model="selectedYear" @change="applyFilters">
        <option value="">All Years</option>
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
      </select>
  
      <div class="timeline">
        <section v-for="(item, index) in filteredData" :key="index">
          <!-- Render your timeline item here -->
          <div>{{ item.Series_Title }} - {{ item.Release_Year }}</div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import { filterByYear, filterByTitleContains, sortByDateDescending } from './Filters.js';
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
  