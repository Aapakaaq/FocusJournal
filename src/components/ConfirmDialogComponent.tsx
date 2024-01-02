import { useState } from "react";

interface props{
    positive: string;
    negative: string;
}

export default function ConfirmDialogComponent({positive, negative}: props){
    const [answer, setAnswer] = useState<boolean>(false);

    function handlePositive(): void{

    }

    function handleNegative(): void{

    }

    return(
        <div className="container">

        </div>
    );
}
