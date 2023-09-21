import Authenticated from "@/Layouts/Authenticated/Index";
import SubscriptionCard from "@/Components/SubscriptionCard";
import { Head } from "@inertiajs/react";

export default function SubscriptionPlan() {
    return (
        <Authenticated>
            <Head title="Subscription"/>
            <div className="py-3 flex flex-col items-center">
                <div className="text-black font-semibold text-[26px] mb-3">
                    Pricing for Everyone
                </div>
                <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                    Invest your little money to get a whole new experiences from
                    movies.
                </p>

                {/* <!-- Pricing Card --> */}
                <div className="flex justify-center gap-10 mt-[70px]">
                    {/* <!-- Basic --> */}
                    <SubscriptionCard
                        name="Basic"
                        price={299000}
                        durationInMonth={3}
                        features={["features 1", "features 2", "features 3"]}
                    />

                    {/* <!-- For Greatest --> */}
                    <SubscriptionCard
                        isPremium={true}
                        name="Premium"
                        price={500000}
                        durationInMonth={3}
                        features={["features 1", "features 2", "features 3"]}
                    />
                </div>
                {/* <!-- /Pricing Card --> */}
            </div>
        </Authenticated>
    );
}
