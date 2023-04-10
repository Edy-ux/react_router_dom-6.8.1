import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
} from "react-router-dom";
import { getContacts, createContact } from "../api/contacts";
import { useEffect } from "react";
import Search from "../components/Search";

//GET method
export async function loader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");
  const contacts = await getContacts(query);
  return { contacts, query };
}

//POST method
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function RootLayout() {
  const { contacts, query } = useLoaderData();
  const navigation = useNavigation();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = query;
  }, [query]);

  return (
    <>
      <div id="sidebar">
        <h1>Router Contacts</h1>
        <div>
          <Search query={query} searching={searching} />
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>		
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
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
              <i>{query && <p>Nenhum Contato</p>}</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
