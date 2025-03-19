import { SectionCards } from "@/components/dashboard/SectionCards";
import { ChartAreaInteractive } from "@/components/dashboard/ChartAreaInteractive";
import { users } from "@/constants/dashboard/users";
import UsersTable from "@/components/dashboard/UsersTable";
import { cardsData, chartConfig, chartData } from "@/constants/dashboard/main";

const page = () => {
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards cardsData={cardsData} />
                <div className="px-4 lg:px-6">
                    <ChartAreaInteractive data={chartData} config={chartConfig} />
                </div>
                <div className="px-4 lg:px-6">
                    <UsersTable users={users} />
                </div>
            </div>
        </div>
    );
};

export default page;
