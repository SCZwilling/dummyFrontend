<script lang="ts">
  import { onMount } from "svelte";
  import { handleStoredToast } from "$lib/toast-utilities";
  import type { PageData } from "./$types";
  import PropertyTable from "$lib/components/PropertyTable.svelte";

  export let data: PageData;

  onMount(() => {
    handleStoredToast();
  });
</script>

<div class="flex flex-col min-h-screen ">
  <!-- Header with title and create button -->
  <div class="flex items-center py-2 px-4 bg-gray-200 dark:bg-gray-800">
    <h2 class="inline-flex text-xl pr-2 align-middle font-semibold text-black dark:text-white">My Properties</h2>
    <a href="/dashboard/properties/create" class="btn btn-accent btn-sm ml-auto text-white dark:bg-accent-dark dark:text-white"> 
      Create New 
    </a>
  </div>
  
  <!-- Property table container -->
  <div class="flex-grow p-2 bg-background-light dark:bg-background-dark">
    {#if data.propertyList && data.propertyList.length > 0}
      <PropertyTable properties={data.propertyList} path="/dashboard/properties/" />
    {:else}
      <div class="flex justify-center items-center h-full text-gray-500 dark:text-gray-400">
        No properties available.
      </div>
    {/if}
  </div>
</div>

<style>
  /* Dark mode specific button background color */
  .dark .btn-accent {
    background-color: #1a73e8; /* Example dark mode accent color */
  }

  .dark .btn-accent:hover {
    background-color: #155bb5; /* Darker hover effect */
  }
</style>
