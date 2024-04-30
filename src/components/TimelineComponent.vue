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
<filter-component @filters-applied="handleFilteredData" :initial-data="initialData"></filter-component>
<script>
export default {
  props: {
    filteredData: Array // Expect an array of objects containing the necessary properties
  },
  mounted() {
    console.log('Filtered data received:', this.filteredData);
    console.log('Filtered data received:', this.filteredData);
    if (!this.filteredData) {
      console.error("No data received");
    }
  }
}

</script>
<style scoped>
:root {
  --v-timeline-marker-size: 16px;
  --v-timeline-track-width: 2px;
  --v-timeline-triangle-size: 12px;
  --v-timeline-sections-gap: var(--space-lg);
  --v-timeline-items-gap: var(--space-sm);
}

.v-timeline {
  position: relative;
  padding: var(--space-lg) 0;
}

.v-timeline::before {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--v-timeline-marker-size) - var(--v-timeline-track-width)) * 0.5);
  height: 100%;
  width: var(--v-timeline-track-width);
  background-color: hsla(var(--color-contrast-higher-h), var(--color-contrast-higher-s), var(--color-contrast-higher-l), 0.1);
}

.v-timeline__section {
  position: relative;
  display: flex;
}

.v-timeline__section:not(:last-of-type) {
  margin-bottom: var(--v-timeline-sections-gap);
}

.v-timeline__marker {
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  height: var(--v-timeline-marker-size);
  width: var(--v-timeline-marker-size);
  border-radius: 50%;
  margin-right: calc(var(--v-timeline-triangle-size) + var(--space-xxs));
}

.v-timeline__item {
  position: relative;
  top: calc(0.5 * var(--v-timeline-marker-size));
  flex-grow: 1;
}

.v-timeline__item::before {
  content: "";
  position: absolute;
  top: 0;
  left: calc(-1 * var(--v-timeline-triangle-size) + 1px);
  height: var(--v-timeline-triangle-size);
  width: var(--v-timeline-triangle-size);
  background-color: inherit;
  -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
}

.v-timeline__item:not(:last-child) {
  margin-bottom: var(--v-timeline-items-gap);
}

.v-timeline__item:not(:first-child) .v-timeline__date {
  display: none;
}

.v-timeline__item:not(:first-child)::before {
  display: none;
}

.v-timeline__date-value {
  color: var(--color-contrast-medium);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

@media not all and (min-width: 64rem) {
  .v-timeline__item:first-child {
    border-top-left-radius: 0;
  }
}

@media (min-width: 64rem) {
  .v-timeline::before {
    left: calc(50% - var(--v-timeline-track-width) / 2);
  }

  .v-timeline__section {
    width: calc(50% + var(--v-timeline-marker-size) / 2);
  }

  .v-timeline__section:nth-child(odd) {
    flex-direction: row-reverse;
  }

  .v-timeline__section:nth-child(odd) .v-timeline__marker {
    margin-right: 0;
    margin-left: calc(var(--v-timeline-triangle-size) + var(--space-xxs));
  }

  .v-timeline__section:nth-child(odd) .v-timeline__item::before {
    left: auto;
    right: calc(-1 * var(--v-timeline-triangle-size) + 1px);
    transform: scaleX(-1);
  }

  .v-timeline__section:nth-child(odd) .v-timeline__item:first-child {
    border-top-right-radius: 0;
  }

  .v-timeline__section:nth-child(odd) .v-timeline__date {
    right: calc(-2 * (var(--v-timeline-triangle-size) + var(--space-xxs)) - var(--v-timeline-marker-size));
    transform: translateX(100%) translateY(-50%);
  }

  .v-timeline__section:nth-child(even) {
    margin-left: auto;
  }

  .v-timeline__section:nth-child(even) .v-timeline__item:first-child {
    border-top-left-radius: 0;
  }

  .v-timeline__section:nth-child(even) .v-timeline__date {
    left: calc(-2 * (var(--v-timeline-triangle-size) + var(--space-xxs)) - var(--v-timeline-marker-size));
    transform: translateX(-100%) translateY(-50%);
  }

  .v-timeline__section--is-hidden {
    opacity: 0;
  }

  .v-timeline__date {
    position: absolute;
    top: 0;
    white-space: nowrap;
  }

  .v-timeline[data-animation=on] .v-timeline__marker {
    opacity: 0;
    transform: scale(0.5);
    transition: transform 0.6s var(--ease-out), opacity 0.6s;
  }

  .v-timeline[data-animation=on] .v-timeline__item {
    opacity: 0;
    transition: transform 0.6s var(--ease-out), opacity 0.6s;
  }

  .v-timeline[data-animation=on] .v-timeline__section:nth-child(odd) .v-timeline__item {
    transform: translateX(-50px);
  }

  .v-timeline[data-animation=on] .v-timeline__section:nth-child(even) .v-timeline__item {
    transform: translateX(50px);
  }

  .v-timeline[data-animation=on] .v-timeline__section--animate .v-timeline__item {
    transform: translateX(0) !important;
    opacity: 1;
  }

  .v-timeline[data-animation=on] .v-timeline__section--animate .v-timeline__marker {
    transform: scale(1);
    opacity: 1;
  }
}

.v-timeline--icons {
  --v-timeline-marker-size: 3em;
}
</style>
