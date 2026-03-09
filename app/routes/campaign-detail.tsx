import CampaignDetailPage from "~/page/campaign-detail-page/CampaignDetailPage";

export function meta({ }) {
    return [
        { title: "Campaign Detail - VotePeace" },
        { name: "description", content: "Detailed information about the election campaign." },
    ];
}

export default function CampaignDetail() {
    return <CampaignDetailPage />;
}
