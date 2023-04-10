
import { redirect } from 'react-router-dom'
import { getContact } from "../api/contacts";
import Contact from '../components/Contact';

export async function loader({ params }) {
  const contact = await getContact(params.contactId);

  return { contact }
}

export default function contactRoute() {
   return <Contact  />
}
