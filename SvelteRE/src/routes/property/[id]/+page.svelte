  <script lang="ts">
    import ImageCarousel from "$lib/components/ImageCarousel.svelte";
    import StaticMap from "$lib/components/StaticMap.svelte";
    import { formatDate } from "$lib/date";
    import type { PageData } from "./$types";

    export let data: PageData;
    const property = data?.property;
  </script>

  <div class=" mx-auto px-4 py-8 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
    <div class="flex flex-col lg:flex-row gap-8 mb-8">
      <!-- Left side: Images -->
      <div class="lg:w-1/2">
        <ImageCarousel property={property} />
      </div>

      <!-- Right side: Property Information -->
      <div class="lg:w-1/2">
        <h1 class="text-3xl font-bold mb-4">{property.type} - {property.status}</h1>

        <!-- Price Section -->
        <div class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-4 rounded-lg shadow-lg mb-6">
          <p class="text-lg font-semibold">Price</p>
          <p class="text-4xl font-extrabold mb-1">{property.price} {property.currency}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Owner Info Card -->
          <div class="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-2">Owner Info</h2>
            <div class="flex flex-col">
              <div class="flex justify-between">
                <p class="font-bold text-gray-700 dark:text-gray-300">Name:</p>
                <p class="text-gray-600 dark:text-gray-400">{property.owner.username}</p>
              </div>
              <div class="flex justify-between">
                <p class="font-bold text-gray-700 dark:text-gray-300">Email:</p>
                <p class="text-gray-600 dark:text-gray-400">{property.owner.email}</p>
              </div>
            </div>
          </div>
          
          <!-- Listing Date Card -->
          <div class="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold mb-2">Listing Date</h2>
            <p class="text-gray-700 dark:text-gray-300">
              <span class="font-bold">{formatDate(property.startDate, "dd/MM/yyyy")}</span> - 
              <span class="font-bold">{formatDate(property.endDate, "dd/MM/yyyy")}</span>
            </p>
          </div>

          <div class="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-md md:col-span-2">
            <h2 class="text-xl font-semibold mb-2">Description</h2>
            <p class="text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut ipsam vitae officia, dolores quidem a fugit in, sit maiores dolor nobis quod optio laboriosam ab! Maiores nam aperiam quae unde. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique itaque voluptate aliquam fugiat rerum repudiandae cupiditate. Voluptatibus quidem nam sapiente ullam repellendus cum non commodi cumque assumenda perspiciatis, amet tenetur!
            </p>
          </div>

        </div>
      </div>
    </div>

    <!-- Map section -->
    <div>
      <h2 class="text-2xl font-bold mb-4">Property Location</h2>
      <div class="h-[400px] w-full">
        <StaticMap {property} />
      </div>
    </div>
  </div>