import { Form, Link, useLoaderData, useNavigate } from 'react-router-dom';
import Favorite from '../Favorite';
import './style.css';

const Contact = () => {
    const { contact } = useLoaderData();
    if (!contact.id) {
        throw new Response('', {
            status: 404,
            statusText: 'Nenhum contato encontrado Not Found',
        });
    }

    return (
        <div id="contact">
            <div>
                <img key={contact.avatar} src={contact.avatar || null} />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}
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
                            if (
                                !confirm(
                                    'Por favor, confirme se deseja excluir este registro'
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
