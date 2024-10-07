<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  export let queryString: string;
</script>

<div class="flex flex-row w-full pt-2">
  <div class="join w-fit mx-auto justify-center">
    {#if data.maxPage > 0}
      {#if data.currentPage === 1}
        <button disabled class="join-item btn w-1/6 light-mode-disabled"> « </button>
      {:else}
        <a class="join-item btn w-1/6 light-mode-active" href="/?page={data.currentPage - 1}{queryString}"> « </a>
      {/if}
      <button class="join-item btn w-2/5 light-mode-active">
        Page {data.currentPage} / {data.maxPage}
      </button>
      {#if data.currentPage === data.maxPage}
        <button disabled class="join-item btn w-1/6 light-mode-disabled"> » </button>
      {:else}
        <a class="join-item btn w-1/6 light-mode-active" href="/?page={data.currentPage + 1}{queryString}"> » </a>
      {/if}
    {:else}
      <button disabled class="join-item btn w-1/6 light-mode-disabled"> « </button>
      <button class="join-item btn w-2/5 light-mode-active"> Page 1 / 1 </button>
      <button disabled class="join-item btn w-1/6 light-mode-disabled"> » </button>
    {/if}
  </div>
</div>

<style>
  /* Styles for light mode */
  .light-mode-active {
    background-color: white; /* White background */
    color: black; /* Black text for readability */
    border: 1px solid #ccc; /* Light gray border for better contrast */
  }

  .light-mode-active:hover {
    background-color: #f0f0f0; /* Slightly darker background on hover */
  }

  .light-mode-disabled {
    background-color: #e0e0e0; /* Light gray for disabled buttons */
    color: #a0a0a0; /* Muted color for disabled text */
    border: 1px solid #ccc;
  }
</style>
