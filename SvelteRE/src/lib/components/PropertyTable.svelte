<script lang="ts">
  import type { ShowcaseProperty } from "$lib/types";
  import { goto } from '$app/navigation';
  import { getContext } from 'svelte';
  import { page } from '$app/stores';

  export let properties: ShowcaseProperty[];
  export let path: string;

  
  $: user = $page.data.user;


  function handlePropertyClick(propertyId: string) {
  const url = `${path}${propertyId}`;
  console.log(url);
  if (user) {
    goto(url);
  } else {
    goto('/login');
  }
}

</script>

<div class="property-table grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
  {#if properties}
    {#each properties as property}
      <div class="bg-surface-light dark:bg-gray-800 border border-gray-200 dark:border-gray-500 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer" on:click={() => handlePropertyClick(property.id)}>
        <img
          src={property.thumbnail}
          alt="{property.type} {property.status}"
          class="w-full h-48 object-cover"
        />
        <div class="p-4 text-center">
          <p class="text-lg font-semibold text-text-light dark:text-white">{property.type} ({property.status})</p>
          <p class="text-2xl font-bold text-primary-light dark:text-green-400">{property.price} {property.currency}</p>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  img {
    aspect-ratio: 4 / 3;
  }
</style>