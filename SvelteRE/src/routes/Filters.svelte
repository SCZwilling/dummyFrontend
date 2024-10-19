<script lang="ts">
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";

  export let data: PageData;
  export let queryString;
  export let filterModal: HTMLDialogElement | null = null;
  export let mobileLayout = false;
  let minPrice = 0;
  let maxPrice = 9999999;
  let typeId = 0;
  let currencyId = 0;
  let statusId = 0;

  function clearFilters() {
    minPrice = 0;
    maxPrice = 9999999;
    typeId = 0;
    currencyId = 0;
    statusId = 0;
    queryString = "";
    goto("/buy", { replaceState: true });
    filterModal?.close();
  }

  function filter() {
    const arr = [];
    if (minPrice !== null && minPrice > 0 && minPrice < 9999999 && minPrice <= maxPrice)
      arr.push(`minPrice=${minPrice}`);
    if (maxPrice !== null && maxPrice > 0 && maxPrice < 9999999 && maxPrice >= minPrice)
      arr.push(`maxPrice=${maxPrice}`);
    if (typeId !== null && typeId > 0) arr.push(`typeId=${typeId}`);
    if (currencyId !== null && currencyId > 0) arr.push(`currencyId=${currencyId}`);
    if (statusId !== null && statusId > 0) arr.push(`statusId=${statusId}`);

    if (arr.length === 0) {
      queryString = "";
      goto("/buy", { replaceState: true }); // Changed to /buy
    } else {
      queryString = `&${arr.join("&")}`;
      goto(`/buy?${arr.join("&")}`, { replaceState: true }); // Changed to /buy
    }
    filterModal?.close();
  }
</script>

<div
  class="flex flex-col p-4 rounded-lg shadow-lg bg-surface-light dark:bg-gray-800 text-text-light dark:text-white max-w-md w-full mx-auto border border-gray-200 dark:border-gray-300"
>
  <h2 class="text-center text-xl font-bold text-text-light dark:text-white mb-4">Filter Options</h2>
  <ul class="space-y-3">
    <!-- Min Price Input -->
    <li class="flex flex-col">
      <label
        for={mobileLayout ? "m-minPrice" : "minPrice"}
        class="label text-text-light dark:text-white text-base">Min Price</label
      >
      <input
        type="number"
        min={0}
        max={9999999}
        id={mobileLayout ? "m-minPrice" : "minPrice"}
        bind:value={minPrice}
        class="input input-bordered bg-background-light dark:bg-gray-700 text-text-light dark:text-white input-md w-full"
      />
    </li>

    <!-- Max Price Input -->
    <li class="flex flex-col">
      <label
        for={mobileLayout ? "m-maxPrice" : "maxPrice"}
        class="label text-text-light dark:text-white text-base">Max Price</label
      >
      <input
        id={mobileLayout ? "m-maxPrice" : "maxPrice"}
        type="number"
        min={0}
        max={9999999}
        bind:value={maxPrice}
        class="input input-bordered bg-background-light dark:bg-gray-700 text-text-light dark:text-white input-md w-full"
      />
    </li>

    <!-- Currency Dropdown -->
    <li class="flex flex-col">
      <label
        for={mobileLayout ? "m-currencyId" : "currencyId"}
        class="label text-text-light dark:text-white text-base">Currency</label
      >
      <select
        class="select select-bordered bg-background-light dark:bg-gray-700 text-text-light dark:text-white text-base w-full"
        bind:value={currencyId}
        id={mobileLayout ? "m-currencyId" : "currencyId"}
      >
        <option selected value={0}>Any</option>
        {#each data.currencies as currency}
          <option value={currency.id}>
            {currency.value}
          </option>
        {/each}
      </select>
    </li>

    <!-- Type Dropdown -->
    <li class="flex flex-col">
      <label
        for={mobileLayout ? "m-typeId" : "typeId"}
        class="label text-text-light dark:text-white text-base">Type</label
      >
      <select
        class="select select-bordered bg-background-light dark:bg-gray-700 text-text-light dark:text-white text-base w-full"
        bind:value={typeId}
        id={mobileLayout ? "m-typeId" : "typeId"}
      >
        <option selected value={0}>Any</option>
        {#each data.types as type}
          <option value={type.id}>
            {type.value}
          </option>
        {/each}
      </select>
    </li>

    <!-- Status Dropdown -->
    <li class="flex flex-col">
      <label
        for={mobileLayout ? "m-statusId" : "statusId"}
        class="label text-text-light dark:text-white text-base">Status</label
      >
      <select
        class="select select-bordered bg-background-light dark:bg-gray-700 text-text-light dark:text-white text-base w-full"
        bind:value={statusId}
        id={mobileLayout ? "m-statusId" : "statusId"}
      >
        <option selected value={0}>Any</option>
        {#each data.statuses as status}
          <option value={status.id}>
            {status.value}
          </option>
        {/each}
      </select>
    </li>

    <!-- Buttons -->
    <li class="flex flex-row space-x-2">
      <button
        class="btn bg-accent-light hover:bg-accent-light/80 dark:bg-blue-400 dark:hover:bg-blue-300 btn-md w-1/2 text-white font-semibold"
        on:click={clearFilters}
      >
        Clear
      </button>
      <button
        class="btn bg-primary-light hover:bg-primary-light/80 dark:bg-teal-600 dark:hover:bg-teal-500 btn-md w-1/2 text-white font-semibold"
        on:click={filter}
      >
        Apply
      </button>
    </li>
  </ul>
</div>
