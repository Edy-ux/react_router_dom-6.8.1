import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact, getContact } from "../api/contacts";


export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact }
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const updates = {
    ...data, twitter: `@${data.twitter.replace('@', '')}`,
    fullName: data.first + ' ' + data.last
  }
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}


export default function EditContact() {

  const { contact } = useLoaderData();
  const navigate = useNavigate("")

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          required
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          required
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@twitter"
          required
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          rows={6}
          defaultValue={contact?.notes}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          onClick={() => navigate(-1)}
          type="button">
          Cancel
        </button>
      </p>
    </Form>
  );
}