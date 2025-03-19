import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
let loggedin = false;

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export async function loader({ request }: LoaderFunctionArgs) {
  if (loggedin === true) {
    return redirect("/panel");
  } else {
    return redirect("/login");
  }
}
export default function Index() {
  return (
    <div>
      <h3>
        If you are seeing this page, that means that something is wrong on the
        server, please contact the server owner, if you are the server owner,
        please look at the docker logs.
      </h3>
      <h4>
        If nothing is working, file a issue on the GitHub repo or email me at
        global@yuanhau.com
      </h4>
    </div>
  );
}
