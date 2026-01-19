import { Spinner } from "../ui/spinner";

export default function LoadingSpinner({text}:{text?: string}){
    return(
        <div className="flex gap-2 items-center">
            <Spinner className="size-10"/>
            <p>{text}</p>
        </div>
    )
}