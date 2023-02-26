import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../contacts";
import { useEffect, useState } from "react";


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
	const submit = useSubmit();
	
	const searching =
		navigation.location &&
		new URLSearchParams(navigation.location.search).has("q");

	console.log(searching)

	useEffect(() => {
		document.getElementById("q").value = q;
	  }, [q]);
	  
	return (
		<>
			<div id="sidebar">
				<h1>React Router Contacts</h1>
				<div>
					<Form id="search-form" role="search">
						<input
							id="q"
							aria-label="Search contacts"
							placeholder="Search"
							type="search"
							name="q"
							className={searching ? "loading" : ""}
							defaultValue={q}
							onChange={(event) => {
								submit(event.currentTarget.form)
							}}

						/>
						<div
							id="search-spinner"
							aria-hidden
							hidden={!searching}
						/>
						<div
							className="sr-only"
							aria-live="polite"
						></div>
					</Form>
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