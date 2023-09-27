import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardSkeleton() {
    return (
        <>
            <Skeleton height={40} width={185} />
            <div className="flex flex-row gap-3">
                <Skeleton
                    containerClassName="flex-1"
                    height={340}
                    style={{
                        borderRadius: "30px",
                    }}
                />
                <Skeleton
                    containerClassName="flex-1"
                    height={340}
                    style={{
                        borderRadius: "30px",
                    }}
                />
                <Skeleton
                    containerClassName="flex-1"
                    height={340}
                    style={{
                        borderRadius: "30px",
                    }}
                />
            </div>
            <div className="w-[80px]">
                <Skeleton height={40} width={185} />
            </div>
            <div className="flex flex-row gap-3">
                <Skeleton
                    containerClassName="flex-1"
                    height={340}
                    width={250}
                    style={{
                        borderRadius: "30px",
                    }}
                />
                <Skeleton
                    containerClassName="flex-1"
                    height={340}
                    width={250}
                    style={{
                        borderRadius: "30px",
                    }}
                />
                <Skeleton
                    containerClassName="flex-1"
                    height={340}
                    width={250}
                    style={{
                        borderRadius: "30px",
                    }}
                />
                <Skeleton
                    containerClassName="flex-1"
                    height={340}
                    width={250}
                    style={{
                        borderRadius: "30px",
                    }}
                />
                <Skeleton
                    containerClassName="flex-1"
                    height={340}
                    width={250}
                    style={{
                        borderRadius: "30px",
                    }}
                />
            </div>
        </>
    );
}
