// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate {
    login: string;
    id: string;
    avatar_url: string;
    url: string;
    html_url: string;
    name: string;
    company?: string;
    location?: string;
    email?: string;
    bio?: string;
}