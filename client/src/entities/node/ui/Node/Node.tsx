import {useGetNodeDataQuery} from "../../model";

interface INodeProps {
    id: string;
}

export const Node = ({id}: INodeProps) => {
    const {data, isSuccess} = useGetNodeDataQuery(id, {pollingInterval: 3000});

    if (!isSuccess) return <div>Loading...</div>

    return (
        <div>
            <div>{data.name}</div>
            <div>{data.status}</div>
        </div>
    )
}