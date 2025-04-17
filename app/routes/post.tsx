import { Form, Link, redirect, useFetcher, useNavigate, useNavigation } from "react-router";
import type { Route } from "./+types/post";

export async function clientLoader({ params }: Route.LoaderArgs) {
    let postId = params.postId;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return await res.json();
}

export async function clientAction({ params }: Route.LoaderArgs) {
    try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, { method: 'delete' });
        return { isDelete: true }
    } catch (error) {
        return { isDelete: false }
    }

}

export default function Post({ loaderData }: Route.ComponentProps) {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const navigation = useNavigation();

    const isNavigating = Boolean(navigation.location)
    const isDelete = fetcher.data?.isDelete;
    const isDeleting = fetcher.state !== 'idle';

    if (isNavigating) {
        return <p>Navigatin.....</p>
    }

    return (
        <div>
            {!isDelete &&
                <>
                    <p>Title: {loaderData.title}</p>
                    <p>Body: {loaderData.body}</p>
                </>
            }
            <Link to={"/predro/about"}>About</Link><br />
            <button onClick={() => navigate('/')}>Redirect</button>
            <fetcher.Form method="delete">
                <button type="submit">DELETE</button>
            </fetcher.Form>

            {isDeleting && <p>Deleting.....</p>}
        </div>
    )
}
