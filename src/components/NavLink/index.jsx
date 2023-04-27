

import { Form, Link, useLoaderData, useNavigate } from "react-router-dom";


export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const contacts = await getContacts(q);
	return { contacts, q };
}

const NavLink = () => {
	// const {data: contacts} = useSelector(RootState => RootState.contactSlice)
   
    const { contacts, q } = useLoaderData();
    console.log(contacts);
   
    return (
       <>
         <nav>
            {contacts.length ? (
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact.id}>
                            <NavLink
                                to={`contacts/${contact.id}`}
                                className={({ isActive, isPending }) =>
                                    isActive
                                        ? "active"
                                        : isPending
                                            ? "pending"
                                            : ""
                                }
                            >
                                <Link to={`contacts/${contact.id}`}>
                                    {contact.first || contact.last ? (
                                        <>
                                            {contact.first} {contact.last}
                                        </>
                                    ) : (
                                        <i>No Name</i>
                                    )}{" "}
                                    {contact.favorite && <span>★</span>}
                                </Link>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    <i>No contacts</i>
                </p>
            )}

        </nav>
       </>
    );
}

export default NavLink;