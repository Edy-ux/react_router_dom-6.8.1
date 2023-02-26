import { Form, redirect } from "react-router-dom";
import { getContact, updateContact } from "../../api/contacts";

export async function action({ request, params }) {
  const contact = await getContact(params.contactId);
  const updateData = {...contact, favorite: !contact.favorite ?? true}
  await updateContact(params.contactId, updateData)
  return redirect(`/contacts/${params.contactId}`);
}
export default function Favorite({ contact }) {
    // yes, this is a `let`   for later
    let favorite = contact.favorite;
    return (
      <Form method="post" action="favorite">
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {favorite ? "★" : "☆"}
        </button>
      </Form>
    );
  }