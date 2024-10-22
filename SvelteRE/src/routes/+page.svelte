<script lang="ts">
  import {
    Home,
    Key,
    Tag,
    DollarSign,
    FileText,
    UserCheck,
    BarChart3,
    Sofa,
    Paintbrush,
    Wrench,
    Truck,
    Utensils,
    Building,
  } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import { page } from '$app/stores';

  $: user = $page.data.user;

  const services = [
    {
      category: "Property & Real Estate Services",
      items: [
        {
          icon: DollarSign,
          title: "Home Loan",
          description:
            "Secure home loans with the best interest rates. We assist through the entire process.",
        },
        {
          icon: FileText,
          title: "Rent Agreement",
          description:
            "Hassle-free service to draft and register rent agreements, ensuring legal compliance.",
        },
        {
          icon: UserCheck,
          title: "Tenant Verification",
          description:
            "Thorough background checks for tenant verification, ensuring your peace of mind.",
        },
        {
          icon: BarChart3,
          title: "Property Valuation",
          description:
            "Comprehensive property valuation reports based on market trends and location.",
        },
      ],
    },
    {
      category: "Home Improvement & Maintenance Services",
      items: [
        {
          icon: Sofa,
          title: "Interior & Exterior Furniture",
          description: "Customised furniture solutions for both interior and exterior spaces.",
        },
        {
          icon: Paintbrush,
          title: "Painting, Cleaning & Water Proofing",
          description: "Professional services to maintain and refresh your property.",
        },
        {
          icon: Wrench,
          title: "Plumbing & Electric Equipment Support",
          description: "Expert services for installations and repairs of home systems.",
        },
        {
          icon: Truck,
          title: "Packers & Movers",
          description: "Trusted relocation services for a stress-free moving experience.",
        },
      ],
    },
    {
      category: "Regulatory & Certification Services",
      items: [
        {
          icon: Utensils,
          title: "Food Certificate (FSSAI)",
          description: "Assistance in obtaining FSSAI certification for food industry businesses.",
        },
        {
          icon: Building,
          title: "Building Permission",
          description:
            "Help in acquiring legal permissions for construction or renovation projects.",
        },
      ],
    },
  ];

  function navigateTo(path: string) {
    goto(path);
  }

  function handleSellClick() {
    if (user) {
      navigateTo("/dashboard/properties/create");
    } else {
      navigateTo("/login");
    }
  }

</script>

<section
  class="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-32"
>
  <div class="container mx-auto px-4">
    <!-- Header Section -->
    <h2 class="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-16">
      <span class="font-light">Discover Your Perfect Space </span>
      <br>
      <span class="font-light">With</span>
      <br>
      <span class="font-bold">Pakka Sauda Real Estate</span>
    </h2>

    <div class="flex flex-wrap justify-center gap-12 mb-24">
      <!-- Buy Option -->
      <div class="flex flex-col items-center cursor-pointer" on:click={() => navigateTo("/buy")}>
        <div
          class="w-48 h-48 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center mb-6 transition-transform hover:scale-105"
        >
          <Home size={72} class="text-blue-500 dark:text-blue-400" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">Buy</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mt-2">Find your dream home</p>
      </div>

      <!-- Rent Option -->
      <div class="flex flex-col items-center cursor-pointer" on:click={() => navigateTo("/buy")}>
        <div
          class="w-48 h-48 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center mb-6 transition-transform hover:scale-105"
        >
          <Key size={72} class="text-green-500 dark:text-green-400" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">Rent</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mt-2">Lease your ideal space</p>
      </div>  

      <!-- Sell Option -->
      <div
        class="flex flex-col items-center cursor-pointer" on:click={handleSellClick}
        
      >
        <div
          class="w-48 h-48 rounded-full bg-white dark:bg-gray-700 shadow-lg flex items-center justify-center mb-6 transition-transform hover:scale-105"
        >
          <Tag size={72} class="text-red-500 dark:text-red-400" />
        </div>
        <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">Sell</h3>
        <p class="text-gray-600 dark:text-gray-400 text-center mt-2">List your property</p>
      </div>
    </div>
  </div>

  <!-- Divider -->
  <div class="w-full max-w-4xl mx-auto border-b border-gray-300 dark:border-gray-600 mb-16"></div>

  <!-- We Make A Difference Section -->
  <div class="container mx-auto px-4 mb-24">
    <h2 class="text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-16">
      We Make A Difference
    </h2>

    <div class="flex flex-wrap justify-center gap-8">
      {#each services[0].items as service}
        <div class="flex flex-col items-center w-64">
          <div
            class="w-24 h-24 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center mb-4"
          >
            <svelte:component
              this={service.icon}
              size={36}
              class="text-blue-500 dark:text-blue-400"
            />
          </div>
          <h4 class="text-xl font-semibold text-gray-700 dark:text-gray-300 text-center mb-2">
            {service.title}
          </h4>
          <p class="text-gray-600 dark:text-gray-400 text-center text-sm">{service.description}</p>
        </div>
      {/each}
    </div>
  </div>

  <div class="w-full max-w-4xl mx-auto border-b border-gray-300 dark:border-gray-600 mb-16"></div>

  <!-- Services Section -->
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-16">
      Our Comprehensive Services
    </h2>

    {#each services as category, index}
      <div
        class="mb-16 {index !== services.length - 1
          ? 'border-b border-gray-300 dark:border-gray-600 pb-16'
          : ''}"
      >
        <!-- Service Category -->
        <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-8">
          {category.category}
        </h3>

        <!-- Service Items Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {#each category.items as service}
            <div
              class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 transition-transform hover:scale-105"
            >
              <svelte:component
                this={service.icon}
                size={40}
                class="text-blue-500 dark:text-blue-400 mb-4"
              />
              <h4 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {service.title}
              </h4>
              <p class="text-gray-600 dark:text-gray-400 text-sm">{service.description}</p>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>
