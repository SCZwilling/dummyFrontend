import { object, string } from "yup";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const propertyType = formData.get("propertyType");
    const message = formData.get("message");

    const contactFormSchema = object({
      firstName: string().required("First name is required"),
      lastName: string().required("Last name is required"),
      email: string().required().email("Invalid email"),
      phone: string(),
      propertyType: string(),
      message: string().required("Message is required"),
    });

    try {
      await contactFormSchema.validate(
        { firstName, lastName, email, phone, propertyType, message },
        { abortEarly: false }
      );

      return {
        success: true,
        status: "Form is valid",
      };
    } catch (error) {
      console.log({ error });
      const errors = error.inner.reduce((acc, err) => {
        return { ...acc, [err.path]: err.message };
      }, {});

      return {
        errors,
        firstName,
        lastName,
        email,
        phone,
        propertyType,
        message,
      };
    }
  },
};