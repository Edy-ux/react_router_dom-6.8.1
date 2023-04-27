import { Form, useLoaderData, redirect, useNavigate } from 'react-router-dom';
import { updateContact, getContact } from '../api/contacts';

export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    return { contact };
}

export async function action({ request, params: { contactId } }) {
    console.log('Params', contactId);
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const updates = {
        ...data,
        twitter: `@${data.twitter.replace('@', '')}`,
        fullName: data.first + ' ' + data.last,
    };
    await updateContact(contactId, updates);
    return redirect(`/contacts/${contactId}`);
}

export default function EditContact() {
    const { contact } = useLoaderData();
    const navigate = useNavigate('');

    return (
        <Form method="post">
            <div id="contact-form">
                <label for="first" className="label-fullname ">
                    {' '}
                    <span>Name</span>
                </label>
                <div className="input-fullname">
                    <input
                        id="first"
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
                </div>
                <label for="twitter" className="label-twitter">
                    <span>Twitter</span>{' '}
                </label>
                <input
                    className="input-twitter"
                    type="text"
                    name="twitter"
                    placeholder="@twitter"
                    required
                    defaultValue={contact?.twitter}
                />
                <label for="avatar" className="label-avatar">
                    <span>Avatar URL</span>
                </label>
                <input
                    className="input-avatar"
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={contact?.avatar}
                />
                <label for="notes" className="label-notes">
                    <span>Notes</span>
                </label>
                <textarea
                    className="input-notes"
                    name="notes"
                    rows={6}
                    defaultValue={contact?.notes}
                />

                <div className="buttons">
                    <button type="submit">Save</button>
                    <button onClick={() => navigate(-1)} type="button">
                        Cancel
                    </button>
                </div>
            </div>
        </Form>
    );
}
