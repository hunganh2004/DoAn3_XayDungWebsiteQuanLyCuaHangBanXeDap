
import Banner from "../components/banner";
import CategorySection from "../components/CategorySection";
import { useEffect, useRef } from "react";

export default function HomePage({handleReload}) {
    const hasReload = useRef(false);

    useEffect(() => {
        if (hasReload.current) {
            handleReload();
            hasReload.current = true
        }
    }, [handleReload]);
    return (
        <div className="home-page" onLoad={() => {
            handleReload()
        }}>
            <Banner />
            <CategorySection />
        </div>
    );
}