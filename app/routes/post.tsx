import type { Route } from "./+types/post";

export async function loader({ params }: Route.LoaderArgs) {
    let postId = params.postId;
    return { postId }; // <-- trả về object chứa postId
}

export async function action() {
    return null;
}

export default function Post({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            <p>Post ID: {loaderData.postId}</p>
        </div>
    )
}
