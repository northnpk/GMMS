import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default () => {
    const router = useRouter()
    const { pid } = router.query

    useEffect(() => {
        if(!pid)return;
        
        console.log(pid)
    }, []);

    return (
        <div>
            Start
            {pid}
        </div>
    );
}
