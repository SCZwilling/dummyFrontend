<script>
    const services = [
      {
        title: "Property & Real Estate Services",
        items: [
          {
            name: "Home Loan",
            description: "We assist in securing home loans with the best interest rates. Our team will help you through the entire process, from document collection to loan approval, ensuring a seamless experience."
          },
          {
            name: "Rent Agreement",
            description: "We offer a hassle-free service to draft and register rent agreements, ensuring all legal terms are covered and compliant with local regulations."
          },
          {
            name: "Tenant Verification",
            description: "Protect your property with our thorough tenant verification service. We perform background checks, including identity verification and previous rental history, for your peace of mind."
          },
          {
            name: "Property Valuation",
            description: "Get an accurate and comprehensive property valuation report. Our experts evaluate your property based on market trends, location, and other factors to provide a realistic market value."
          }
        ]
      },
      {
        title: "Home Improvement & Maintenance Services",
        items: [
          {
            name: "Interior & Exterior Furniture",
            description: "Enhance your home with our customised furniture solutions for both interior and exterior spaces. We offer a wide range of styles to suit your taste and functional needs."
          },
          {
            name: "Painting, Cleaning & Water Proofing",
            description: "We provide professional painting, deep cleaning, and waterproofing services to maintain and refresh your property. Whether it's a fresh coat of paint or preventative maintenance, our team has you covered."
          },
          {
            name: "Plumbing & Electric Equipment Support",
            description: "Ensure your home systems run smoothly with our expert plumbing and electrical services. From installations to repairs, we provide reliable support for all your needs."
          },
          {
            name: "Packers & Movers",
            description: "Relocate with ease using our trusted packers and movers service. We handle your belongings with care and ensure timely transportation, making your moving experience stress-free."
          }
        ]
      },
      {
        title: "Regulatory & Certification Services",
        items: [
          {
            name: "Food Certificate (FSSAI)",
            description: "For businesses in the food industry, we help you obtain the necessary Food Safety and Standards Authority of India (FSSAI) certification, ensuring compliance with government regulations."
          },
          {
            name: "Building Permission",
            description: "Navigate the complexities of construction permits with our building permission service. We help you acquire the required legal permissions for any construction or renovation projects, ensuring compliance with local regulations."
          }
        ]
      }
    ];
  </script>
  
  <main class="container mx-auto px-4 py-8 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
    <h1 class="text-4xl font-bold text-center mb-6">Our Services</h1> 
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each services as service}
          <div class="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md">
            <h2 class="text-2xl font-semibold mb-4 text-primary-light dark:text-primary-dark">{service.title}</h2>
            <ul class="space-y-4">
              {#each service.items as item}
                <li>
                  <h3 class="text-xl font-medium mb-2 text-gray-900 dark:text-gray-300">{item.name}</h3> <!-- Adjust text color -->
                  <p class="text-gray-700 dark:text-gray-400">{item.description}</p> <!-- Adjust text color -->
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
  </main>
