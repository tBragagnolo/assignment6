import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const PUBLIC_PATHS = ['/login', '/', '/_error'];

export default function RouteGuard(props) {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        authCheck(router.pathname);

        router.events.on('routeChangeComplete', authCheck);

        return () => {
        router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!PUBLIC_PATHS.includes(path)) {
        console.log(`trying to request a secure path: ${path}`);
        }
    }

    return <>{props.children}</>
}