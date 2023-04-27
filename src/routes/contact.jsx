
import { redirect } from 'react-router-dom'
import { getContact } from "../api/contacts";
import Contact from '../components/Contact';

export async function loader({ params }) {
  const contact = await getContact(params.contactId);

  return { contact }
}

export default function contactRoute() {
<<<<<<< HEAD
   return <Contact/>
}
=======
   return <Contact  />
}
>>>>>>> 47cc6c65cdf4a2b4e6a48d51995abeecb98f8fa3
