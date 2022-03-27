import { useRouter } from "next/router"

export default function useAccentColor() {
    const router = useRouter()
    const top_route = router.asPath.split('/')[1]
    let curr_color: string;
    if (top_route === 'reading') {
        curr_color = 'text-red'
    } else if (top_route === 'writing') {
        curr_color = 'text-green'
    } else if (top_route === 'links') {
        curr_color = 'text-purple'
    } else {
        curr_color = 'text-blue'
    }

    return curr_color
}