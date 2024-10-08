<script lang="ts">
  import Pagination from "./Pagination.svelte";
  import Filters from "./Filters.svelte";
  import PropertyTable from "$lib/components/PropertyTable.svelte";
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { handleStoredToast } from "$lib/toast-utilities";

  export let data: PageData;
  let queryString = "";
  let filterModal: HTMLDialogElement;

  onMount(() => {
    handleStoredToast();
  });
</script>

<section class="flex bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
  <!-- Sticky Filters Section -->
  <div class="filter-side-menu sticky top-0 w-80 min-w-80 pt-4 pl-4 h-[calc(100vh-2rem)] overflow-y-auto">
    <Filters {data} bind:queryString />
  </div>
  
  <!-- Main Content Area -->
  <div class="main-content flex-grow p-4">
    <div class="filter-modal-btn hidden">
      <button on:click={() => filterModal.showModal()} class="btn btn-md">Filters</button>
      <dialog bind:this={filterModal} class="modal text-left">
        <div class="modal-box">
          <Filters {data} bind:queryString {filterModal} mobileLayout={true} />
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>

    <div class="table-container p-0 w-full mt-0">
      {#if data.maxPage > 0}
        <PropertyTable properties={data.propertyList} path="/property/" />
      {:else}
        <div class="w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto w-32 h-24 lucide lucide-x-octagon">
            <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
          <p class="text-center">No Properties Found</p>
        </div>
      {/if}
    </div>

    <!-- Pagination Section -->
    <Pagination {data} bind:queryString />
  </div>
</section>

<style>
  @media (max-width: 768px) {
    .filter-side-menu {
      display: none; /* Hide the left filter on mobile */
    }

    .filter-modal-btn {
      display: flex; /* Show the filter modal button on mobile */
      margin: auto; /* Center the button */
    }
  }
</style>
