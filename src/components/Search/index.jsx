
import { Form, useSubmit } from "react-router-dom";

const Search = ({ query, searching}) => {
    const submit = useSubmit();
 
    return (
        <Form id="search-form">
            <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                className={searching ? "loading" : ""}
                defaultValue={query}
                onChange={(event) => {
                    const isFirstSearch = q == null;
                    submit(event.currentTarget.form, {
                        replace: !isFirstSearch,
                    });
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
    )
}

export default Search