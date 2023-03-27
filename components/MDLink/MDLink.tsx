import Link from "next/link"
import React from "react";

// Assets
import ArrowUpRight from "../../public/icons/stephen-pinker.svg"
import ExternalIcon from "../../public/icons/external.svg"

export default function MDLink (props: React.HTMLProps<HTMLAnchorElement>) {

    return(
        <>
            {
                // Why are styles duplicated? DRY only applies when R>=3
                props.href !== undefined ?
                    props.href[0] === '/' ?
                    <Link href={props.href} className="inline-flex items-center text-green hover:underline hover:underline-offset-2">
                        {props.children}
                        <ArrowUpRight className="w-[10px] h-[9px] ml-0.5 mt-1" />
                    </Link> :
                    <a {...props} className="inline-flex items-center text-blue hover:underline hover:underline-offset-2">
                        {props.children}
                        <ExternalIcon className="w-[10px] h-[10px] ml-1 mt-0.5"/>
                    </a>
                :<></>
            }
        </>
    )
}