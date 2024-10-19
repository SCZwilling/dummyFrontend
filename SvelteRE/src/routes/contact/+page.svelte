<script>
  import { onMount } from "svelte"; 

  let firstName = "";
  let lastName = "";
  let email = "";
  let phone = "";
  let message = "";
  let successMessage = ""; 

  function getPrefilledLink() {
    // return `https://docs.google.com/forms/d/e/1FAIpQLSe7--7Ebq4bHL7I4rzWYt-hgv9ptaZqwa0T_zMEQJNeXjN6uA/formResponse?usp=pp_url&entry.1010428604=${encodeURIComponent(firstName)}&entry.271603404=${encodeURIComponent(lastName)}&entry.1238890979=${encodeURIComponent(email)}&entry.2055772759=${encodeURIComponent(phone)}&entry.1606503875=${encodeURIComponent(propertyType)}&entry.629860105=${encodeURIComponent(message)}&submit=Submit`;
    return `https://docs.google.com/forms/d/e/1FAIpQLSeZM-rk4PxWgA2C-VPTvuIyhAnaV3MXfAOIa3OIV5kjsxTGEA/viewform?usp=pp_url&entry.185973987=${encodeURIComponent(firstName)}&entry.1626136969=${encodeURIComponent(lastName)}&entry.1602143526=${encodeURIComponent(phone)}&entry.2117648981=${encodeURIComponent(email)}&entry.874932534=${encodeURIComponent(message)}&submit=Submit`;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const prefilledLink = getPrefilledLink();

    
    window.open(prefilledLink, "_blank");

    successMessage = "Form submitted successfully!";

    firstName = "";
    lastName = "";
    email = "";
    phone = "";
    message = "";

    setTimeout(() => {
      successMessage = "";
    }, 3000); 
  }
</script>

<div
  class=" mx-auto px-4 py-8 mt-[-8] bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
>
  <div class="flex justify-center">
    <div
      class="bg-surface-light dark:bg-surface-dark rounded-lg shadow-lg p-8 w-full md:w-2/3 lg:w-2/3"
    >
      <h1 class="text-4xl font-bold mb-6 text-center">Contact Us</h1>

      <div class="flex flex-wrap -mx-4">
        <div class="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <div
            class="p-6 rounded-lg bg-background-light dark:bg-background-dark h-full flex flex-col justify-between"
          >
            <div>
              <h2 class="text-2xl font-semibold mb-4">
                We're here to help you with all your property needs!
              </h2>
              <p class="mb-4">
                Whether you're looking to buy, rent, or sell a property – be it a home, hostel,
                shop, or any other type of real estate – we've got you covered. Our platform offers
                a seamless experience with a wide variety of properties available, catering to both
                individuals and businesses.
              </p>
              <p class="mb-4">
                In addition to our core property services, we also provide a range of support
                services to make the process smoother for you. From home loans and tenant
                verification to maintenance services like painting, cleaning, plumbing, and even
                packers & movers – our team is committed to assisting you every step of the way.
              </p>
              <p>
                Feel free to reach out to us with any inquiries, whether you're a buyer, seller,
                tenant, or property owner. We're always available to answer your questions and
                provide the support you need.
              </p>
            </div>

            <div class="mt-6">
              <h3 class="text-xl font-semibold mb-2">How to Reach Us</h3>
              <p><strong>Phone:</strong> [Insert Phone Number]</p>
              <p><strong>Email:</strong> [Insert Email Address]</p>
              <p><strong>Office Hours:</strong> Monday to Friday, 9:00 AM – 6:00 PM</p>
              <p><strong>Office Address:</strong> [Insert Office Address]</p>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/2 px-4">
          <form
            on:submit={handleSubmit}
            class="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md h-full"
          >
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label for="firstName" class="block mb-2">First name *</label>
                <input
                  type="text"
                  id="firstName"
                  bind:value={firstName}
                  required
                  class="w-full px-3 py-2 border rounded bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                />
              </div>
              <div>
                <label for="lastName" class="block mb-2">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  bind:value={lastName}
                  required
                  class="w-full px-3 py-2 border rounded bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
                />
              </div>
            </div>

            <div class="mb-4">
              <label for="phone" class="block mb-2">Phone *</label>
              <input
                type="text"
                id="phone"
                required
                bind:value={phone}
                class="w-full px-3 py-2 border rounded bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
              />
            </div>

            <div class="mb-4">
              <label for="email" class="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                bind:value={email}
                class="w-full px-3 py-2 border rounded bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
              />
            </div>

            <div class="mb-4">
              <label for="message" class="block mb-2">Service/Inquiry Wanted *</label>
              <textarea
                id="message"
                required
                bind:value={message}
                rows="4"
                class="w-full px-3 py-2 border rounded bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
              ></textarea>
            </div>

            <button
              type="submit"
              class="bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
