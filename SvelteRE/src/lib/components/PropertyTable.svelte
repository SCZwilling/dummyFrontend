<script lang="ts">
  import type { ShowcaseProperty } from "$lib/types";

  export let properties: ShowcaseProperty[];
  export let path: string;
</script>

<div class="property-table grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
  {#if properties}
    {#each properties as property}
      <div class="bg-surface-light dark:bg-gray-800 border border-gray-200 dark:border-gray-500 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
        <a href="{path}{property.id}">
          <img
            src={property.thumbnail}
            alt="{property.type} {property.status}"
            class="w-full h-48 object-cover"
          />
        </a>
        <div class="p-4 text-center">
          <p class="text-lg font-semibold text-text-light dark:text-white">{property.type} ({property.status})</p>
          <p class="text-2xl font-bold text-primary-light dark:text-green-400">{property.price} {property.currency}</p>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  /* Ensure the img maintains the aspect ratio while being responsive */
  img {
    aspect-ratio: 4 / 3;
  }
</style>
