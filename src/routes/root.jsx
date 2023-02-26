import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../api/contacts";
import { useEffect } from "react";
import Search from "../components/Search";

//GET method
export async function loader({ request }) {
	const url = new URL(request.url);
	const q = url.searchParams.get("q");
	const contacts = await getContacts(q);
	return { contacts, q };
}

//POST method
export async function action({ request }) {
	const contact = await createContact();
	return redirect(`/contacts/${contact.id}/edit`);
}

export default function RootLayout() {

	const { contacts, q } = useLoaderData();
	const navigation = useNavigation();

	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has("q");

	useEffect(() => {
		document.getElementById("q").value = q;
	}, [q]);


	return (
		<>
			<div id="sidebar">
				<h1>React Router Contacts</h1>
				<div>
					<Search query={q} searching={searching} />
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
			</div>
			<div
				id="detail"
				className={
					navigation.state === "loading" ? "loading" : ""
				}
			>
				<Outlet />
			</div>
		</>
	);
}