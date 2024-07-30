export type NodeSchema = {
    id: string;
    name: string;
    status: "normal" | "migrate" | "error";
}
