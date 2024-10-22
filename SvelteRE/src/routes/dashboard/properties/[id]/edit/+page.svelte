<script lang="ts">
  // @ts-ignore
  import Carousel from "svelte-carousel";
  import { goto, invalidateAll } from "$app/navigation";
  import * as api from "$lib/api";
  import toast from "svelte-french-toast";
  import type { PageData } from "./$types";
  import type { EditPropertyBody } from "$lib/types";
  import { prepareToast } from "$lib/toast-utilities";
  import PickLocationModal from "$lib/components/PickLocationModal.svelte";
  import SelectImageModal from "$lib/components/SelectImageModal.svelte";

  export let data: PageData;
  let loading = false;
  let typeId: number;
  let statusId: number;
  let currencyId: number;
  let images: FileList | null;
  let selectedImageId: number;
  let deleteImageModal: HTMLDialogElement;
  let endDate = data.property.endDate;
  let price = data.property.price;
  let latitude = data.property.latitude;
  let longitude = data.property.longitude;
  let editImageModal: HTMLDialogElement;
  let selectImageModal: HTMLDialogElement;
  let editLocationModal: HTMLDialogElement;
  let selectedImage: File | null = null;
  let propertyInfo = data.property.propertyInfo;

  $: pendingChanges =
    typeId !== -1 ||
    statusId !== -1 ||
    currencyId !== -1 ||
    endDate !== data.property.endDate ||
    price !== data.property.price ||
    latitude !== data.property.latitude ||
    longitude !== data.property.longitude ||
    propertyInfo !== data.property.propertyInfo;

  async function editProperty() {
    loading = true;
    const body: EditPropertyBody = { id: data.property.id };
    if (price !== data.property.price) {
      body.price = price;
    }
    if (endDate !== data.property.endDate) {
      body.endDate = endDate;
    }
    if (typeId !== -1) {
      body.propertyTypeId = typeId;
    }
    if (statusId !== -1) {
      body.propertyStatusId = statusId;
    }
    if (currencyId !== -1) {
      body.currencyId = currencyId;
    }
    if (latitude !== data.property.latitude) {
      body.latitude = Number(latitude.toFixed(2));
    }
    if (longitude !== data.property.longitude) {
      body.longitude = Number(longitude.toFixed(2));
    }
    const response = await api.put(fetch, "Property", data.user?.token, body);
    if (response.status === 204) {
      prepareToast({ message: "Property edited successfully", type: "success" });
      goto(`/dashboard/properties/${data.property.id}`, { replaceState: true });
    } else {
      toast.error("An error occurred while editing the property.");
      console.log("An error occurred while editing the property. ", response.status);
      loading = false;
    }
  }

  async function deleteImage() {
    loading = true;
    const response = await api.del(fetch, `PropertyImage?id=${selectedImageId}`, data.user?.token);
    if (response.status === 204) {
      toast.success("Image deleted successfully");
      invalidateAll();
    } else if (response.status === 400) {
      toast.error("You cannot delete the only image of a property.");
    } else {
      toast.error("An error occurred while deleting the image.");
    }
    deleteImageModal.close();
    loading = false;
  }

  async function addImages() {
    loading = true;
    if (!images || images.length === 0) {
      toast.error("Please select images to upload");
      loading = false;
      selectImageModal.close();
      return;
    }
    const form = new FormData();
    form.append("PropertyId", String(data.property.id));
    for (const image of images) {
      form.append("Images", image);
    }
    const response = await api.post(fetch, "PropertyImage", data.user?.token, null, form);
    if (response.status === 200) {
      images = null;
      prepareToast({ message: "Images added successfully", type: "success" });
      goto(`/dashboard/properties/${data.property.id}`, { replaceState: true });
    } else {
      toast.error("An error occurred while adding the images.");
    }
    loading = false;
    selectImageModal.close();
  }

  async function editImage() {
    loading = true;
    if (selectedImage === null) {
      toast.error("Please select an image to upload");
      loading = false;
      editImageModal.close();
      return;
    }
    const form = new FormData();
    form.append("Id", String(selectedImageId));
    form.append("Image", selectedImage);
    const response = await api.put(fetch, "PropertyImage", data.user?.token, null, form);
    if (response.status === 204) {
      selectedImage = null;
      toast.success("Image edited successfully");
      invalidateAll();
    } else {
      toast.error("An error occurred while editing the image.");
    }
    loading = false;
    editImageModal.close();
  }

  function setImage(event: Event) {
    const target = event.target as HTMLInputElement;
    selectedImage = target.files ? target.files[0] : null;
  }
</script>

<section class="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark pt-6 pb-12">
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold mb-8 text-center">Edit Property</h1>
    <div class="max-w-2xl mx-auto">
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-6">
        <form
          method="POST"
          on:submit|preventDefault={editProperty}
          enctype="multipart/form-data"
          class="space-y-6"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="type" class="block text-sm font-medium mb-2">Property Type</label>
              <select
                name="PropertyTypeId"
                id="type"
                class="select select-bordered w-full bg-surface-light dark:bg-surface-dark"
                bind:value={typeId}
              >
                <option selected disabled value={-1}>Previous: {data.property.type}</option>
                {#each data.types as type}
                  <option value={type.id}>{type.value}</option>
                {/each}
              </select>
            </div>
            <div>
              <label for="status" class="block text-sm font-medium mb-2">Property Status</label>
              <select
                name="PropertyStatusId"
                id="status"
                class="select select-bordered w-full bg-surface-light dark:bg-surface-dark"
                bind:value={statusId}
              >
                <option selected disabled value={-1}>Previous: {data.property.status}</option>
                {#each data.statuses as status}
                  <option value={status.id}>{status.value}</option>
                {/each}
              </select>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="currency" class="block text-sm font-medium mb-2">Currency</label>
              <select
                name="CurrencyId"
                id="currency"
                class="select select-bordered w-full bg-surface-light dark:bg-surface-dark"
                bind:value={currencyId}
              >
                <option selected disabled value={-1}>Previous: {data.property.currency}</option>
                {#each data.currencies as currency}
                  <option value={currency.id}>{currency.value}</option>
                {/each}
              </select>
            </div>
            <div>
              <label for="price" class="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                id="price"
                name="Price"
                bind:value={price}
                class="input input-bordered w-full bg-surface-light dark:bg-surface-dark"
                placeholder="Enter new price"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="endDate" class="block text-sm font-medium mb-2">End Date</label>
              <input
                bind:value={endDate}
                type="date"
                id="endDate"
                name="EndDate"
                class="input input-bordered w-full bg-surface-light dark:bg-surface-dark"
              />
            </div>
            <div>
              <label for="choose-location" class="block text-sm font-medium mb-2">Property Location</label>
              <button
                on:click|preventDefault={() => editLocationModal.showModal()}
                class="btn btn-info w-full"
              >
                Edit Location
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="col-span-1 md:col-span-2">
              <label for="propertyInfo" class="block text-sm font-medium mb-2">Property Description</label>
              <input
                type="text"
                id="propertyInfo"
                name="PropertyInfo"
                bind:value={propertyInfo}
                class="input input-bordered w-full bg-surface-light dark:bg-surface-dark"
                placeholder="Enter property info like address, city, etc."
              />
            </div>
          </div>
          
          <div class="flex justify-end mt-6">
            <button 
              type="submit" 
              disabled={!pendingChanges || loading} 
              class="btn btn-accent text-white dark:text-gray-900 px-6 hover:bg-primary-dark dark:hover:bg-primary-light"
            >
              {loading ? "Saving changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="mt-12">
    <div class="max-w-4xl mx-auto">
      <div class="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold">Image Gallery</h2>
          <button
            on:click={() => selectImageModal.showModal()}
            class="btn btn-success btn-sm"
          >
            Add Image
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="ml-2"
            >
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
              <line x1="12" x2="12" y1="8" y2="16" />
              <line x1="8" x2="16" y1="12" y2="12" />
            </svg>
          </button>
        </div>
        <div class="w-full">
          {#key data.property.images}
            <Carousel>
              {#each data.property.images as image (image.id)}
                <div class="relative">
                  <img
                    src={image.value}
                    alt="{data.property.type} {data.property.status}"
                    class="w-full h-64 object-cover rounded-lg"
                  />
                  <div class="absolute top-2 right-2 space-x-2">
                    <button
                      on:click={() => {
                        selectedImageId = image.id;
                        editImageModal.showModal();
                      }}
                      class="btn btn-circle btn-sm btn-info"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </button>
                    <button
                      on:click={() => {
                        selectedImageId = image.id;
                        deleteImageModal.showModal();
                      }}
                      class="btn btn-circle btn-sm btn-error"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-4 w-4"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
              {/each}
            </Carousel>
          {/key}
        </div>
      </div>
    </div>
  </div>
</section>

<dialog bind:this={deleteImageModal} class="modal text-left">
  <div class="modal-box bg-surface-light dark:bg-surface-dark">
    <h3 class="font-bold text-lg">Are you sure you want to delete this image?</h3>
    <p class="py-4">This action cannot be undone!</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-error" disabled={loading} on:click|preventDefault={deleteImage}
          >{loading ? "Deleting..." : "Delete"}</button
        >
        <button class="btn btn-neutral" disabled={loading}>Close</button>
      </form>
    </div>
  </div>
</dialog>

<dialog bind:this={editImageModal} class="modal text-left">
  <div class="modal-box bg-surface-light dark:bg-surface-dark">
    <h3 class="pb-2 font-bold text-lg">Edit Image</h3>
    {#if selectedImage}
      <img
        class="pb-2 w-48 h-36 justify-center"
        src={URL.createObjectURL(selectedImage)}
        alt={selectedImage.name}
      />
    {/if}
    <input
      type="file"
      accept=".jpg, .jpeg, .png"
      class="file-input file-input-bordered file-input-sm w-full max-w-xs bg-surface-light dark:bg-surface-dark"
      on:change={setImage}
    />
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-info" disabled={loading} on:click|preventDefault={editImage}
          >{loading ? "Editing..." : "Confirm"}</button
        >
        <button class="btn btn-neutral" disabled={loading}>Close</button>
      </form>
    </div>
  </div>
</dialog>

<PickLocationModal bind:modal={editLocationModal} bind:latitude bind:longitude />
<SelectImageModal
  bind:modal={selectImageModal}
  bind:images
  confirmFunction={addImages}
  bind:loading
/>
