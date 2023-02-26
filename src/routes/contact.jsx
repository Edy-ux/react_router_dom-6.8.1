import { Form, Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { getContact, updateContact } from "../contacts";


export async function loader({ params }) {

  const contact = await getContact(params.contactId);
  return { contact }
}

export async function action({ request, params }) {
  const contact = await getContact(params.contactId);
  const updateData = {...contact, favorite: !contact.favorite ?? true}
  await updateContact(params.contactId, updateData)
  return redirect(`/contacts/${params.contactId}`);
}
export default function Contact() {
  const { contact } = useLoaderData();
  console.log(contact)
  const navigate = useNavigate("")

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Link to="edit">
            <button type="submit">Edit</button>
          </Link>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Por favor, confirme se deseja excluir este registro")) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
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