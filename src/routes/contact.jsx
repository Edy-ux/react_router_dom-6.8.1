
import { redirect } from 'react-router-dom'
import { getContact } from "../api/contacts";
import Contact from '../components/Contact';
import Favorite from "../components/Favorite";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact }
}

export default function contactRoute() {
   return <Contact/>
}
