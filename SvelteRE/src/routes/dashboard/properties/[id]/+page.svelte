<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import StaticMap from "$lib/components/StaticMap.svelte";
  import { formatDate } from "$lib/date";
  import { handleStoredToast, prepareToast } from "$lib/toast-utilities";
  import toast from "svelte-french-toast";
  import * as api from "$lib/api";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import ImageCarousel from "$lib/components/ImageCarousel.svelte";

  export let data: PageData;
  let deleting = false;
  let modal: HTMLDialogElement;

  onMount(() => {
    const toastHandled = handleStoredToast();
    if (toastHandled) invalidateAll();
  });

  async function handleDelete() {
    deleting = true;
    const { status } = await api.del(fetch, `Property?id=${data.property.id}`, data.user?.token);
    if (status === 204) {
      prepareToast({ message: "Property deleted successfully", type: "success" });
      goto("/dashboard/properties");
    } else {
      console.log("An error occurred while deleting the property. ", status);
      toast.error("An error occurred while deleting the property.");
      modal.close();
      deleting = false;
    }
  }
</script>

<div class="px-8 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark pt-6">
  <div class="flex flex-col md:flex-row items-start justify-between">
    <!-- Property Image Carousel -->
    <div class="flex-shrink-0 w-full md:w-1/2">
      <ImageCarousel property={data.property} />
    </div>

    <!-- Property Info Section -->
    <div class="md:ml-4 flex-grow">
      <div class="text-right mb-4">
        <a href="./{data.property.id}/edit" class="btn btn-info btn-square btn-sm md:btn-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-pencil"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        </a>

        <button
          class="btn btn-error btn-square btn-sm md:btn-md"
          on:click={() => {
            modal.showModal();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-trash-2"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </button>

        <dialog bind:this={modal} class="modal text-left">
          <div class="modal-box bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
            <h3 class="font-bold text-lg">Are you sure you want to delete this property?</h3>
            <p class="py-4">This action cannot be undone!</p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn btn-error" disabled={deleting} on:click|preventDefault={handleDelete}>
                  {deleting ? "Deleting" : "Delete"}
                </button>
                <button class="btn btn-info" disabled={deleting}>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <!-- Enhanced Property Info Section -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <div class="py-2">
          <h2 class="font-bold text-xl">Listing Date</h2>
          <p class="text-gray-700 dark:text-gray-300">
            {formatDate(data.property.startDate, "dd/MM/yyyy")} - {formatDate(
              data.property.endDate,
              "dd/MM/yyyy"
            )}
          </p>
        </div>
        <div class="py-2 border-t border-gray-200 dark:border-gray-600 mt-4">
          <h2 class="font-bold text-xl">Property Info</h2>
          <p class="font-semibold text-lg">{data.property.type}</p>
          <p class="font-semibold text-lg">{data.property.status}</p>
          <p class="font-semibold text-lg">
            {data.property.price} {data.property.currency}
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Property Location Section -->
  <div class="flex flex-col pt-4">
    <div class="flex mx-auto">
      <p class="font-bold sm:text-lg">Property Location</p>
    </div>
    <StaticMap property={data.property} />
  </div>
</div>
