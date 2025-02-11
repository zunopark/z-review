import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const auth = getAuth();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(auth.currentUser);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener
    }, []);

    if (loading) {
        return <div>Loading</div>; // Prevents flickering
    }

    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
